import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';

import { UserEntity } from '@/common/entities';
import { generateAnswer } from '@/common/helpers/generate-answer';
import { decode, sign, verify } from '@/common/helpers/jwt';
import { randomString } from '@/common/helpers/random-string';
import { byMinutes, bySeconds } from '@/common/helpers/timespan';
import {
  LoginChallenge,
  LoginQuestionCheckBody,
} from '@/common/models/login-challenge';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { ConfigKeys } from '../base/config.module';

export enum AnswerValidationErrors {
  NOT_DECODABLE = 0,
  NOT_VERIFIABLE = 1,
  USER_NOT_FOUND = 2,
  EXPIRED = 3,
  WRONG = 4,
}

@Injectable()
export class UserUtilsService {
  public constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async generateToken(user: UserEntity): Promise<string> {
    return await sign(
      {
        userId: user.id,
        level: user.role,
        exp: ~~(
          (Date.now() +
            this.configService.get<number>(ConfigKeys.AUTH_TOKEN_EXP)) /
          bySeconds(1)
        ),
      },
      user.secret,
    );
  }

  public async generateChallenge(user: UserEntity): Promise<LoginChallenge> {
    const challenge: LoginChallenge = {
      question: randomString(64, randomBytes(32).toString('utf-8')),
      questionCheckBody: null,
      questionCheck: null,
    };

    challenge.questionCheckBody = {
      question: challenge.question,
      exp: Date.now() + byMinutes(2),
      userId: user.id,
    };

    const signedQuestionCheck = await sign(
      challenge.questionCheckBody,
      user.secret,
    );

    challenge.questionCheck = signedQuestionCheck;

    return challenge;
  }

  public async validateAnswer(
    questionCheck: string,
    answer: string,
  ): Promise<AnswerValidationErrors | string> {
    let questionCheckBody: LoginQuestionCheckBody;

    try {
      questionCheckBody = (await decode<LoginQuestionCheckBody>(
        questionCheck,
      )) as LoginQuestionCheckBody;
    } catch (err) {
      return AnswerValidationErrors.NOT_DECODABLE;
    }

    const { userId, exp, question } = questionCheckBody;

    if (exp < Date.now()) return AnswerValidationErrors.EXPIRED;

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) return AnswerValidationErrors.USER_NOT_FOUND;

    const { secret } = user;

    try {
      await verify(questionCheck, secret);
    } catch (err) {
      return AnswerValidationErrors.NOT_VERIFIABLE;
    }

    const correctAnswer = generateAnswer(question, user.password);

    if (correctAnswer !== answer) return AnswerValidationErrors.WRONG;

    return await this.generateToken(user);
  }
}
