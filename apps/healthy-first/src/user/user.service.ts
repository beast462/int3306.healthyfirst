import { createHash, randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { RoleEntity, UserEntity } from '@/common/entities';
import { generateAnswer } from '@/common/helpers/generate-answer';
import { decode, sign, verify } from '@/common/helpers/jwt';
import { randomRange } from '@/common/helpers/random-range';
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
import { MailService } from '../mail/mail.service';

export enum AnswerValidationErrors {
  NOT_DECODABLE = 0,
  NOT_VERIFIABLE = 1,
  USER_NOT_FOUND = 2,
  EXPIRED = 3,
  WRONG = 4,
}

export enum CreateUserErrors {
  USERNAME_EXISTS = 0,
  EMAIL_EXISTS = 1,
  BOTH = 2,
}

@Injectable()
export class UserService {
  public constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
  ) {}

  public async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  public async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }

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

  public hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  public async createUser(
    username: string,
    displayName: string,
    email: string,
    role: RoleEntity,
  ): Promise<CreateUserErrors | UserEntity> {
    const existedUsers = await this.userRepository.find({
      where: [{ username }, { email }],
    });

    if (existedUsers.length > 0) {
      if (existedUsers.length === 2)
        // username or email is unique so it's impossible to have both
        return CreateUserErrors.BOTH;

      if (existedUsers[0].username === username)
        return CreateUserErrors.USERNAME_EXISTS;

      return CreateUserErrors.EMAIL_EXISTS;
    }

    const plainPassword = randomRange(100000, 999999, true).toString();

    const user = this.userRepository.create({
      username,
      displayName,
      email,
      password: this.hashPassword(plainPassword),
      secret: createHash('sha256').update(v4()).digest('hex'),
      role,
    });

    const result = (await this.userRepository.insert(user))
      .generatedMaps[0] as UserEntity;

    user.id = result.id;
    user.createdAt = result.createdAt;

    await this.mailService.sendMail(
      email,
      'Welcome to Healthyfirst',
      'new-user',
      {
        name: displayName,
        username,
        password: plainPassword,
        day: user.createdAt.toLocaleDateString('vi-VN'),
      },
    );

    return result;
  }
}
