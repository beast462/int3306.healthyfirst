import { UserEntity } from '@/common/entities';
import { generateAnswer } from '@/common/helpers/generate-answer';
import { sign } from '@/common/helpers/jwt';
import { randomString } from '@/common/helpers/random-string';
import { byMinutes } from '@/common/helpers/timespan';
import { LoginChallenge } from '@/common/models/login-challenge';
import { PublicUser } from '@/common/models/public-user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { omit } from 'lodash';

export enum AnswerValidationErrors {
  NOT_FOUND = 0,
  EXPIRED = 1,
  INVALID = 2,
}

@Injectable()
export class UserService {
  private static readonly challengeCache: Map<string, LoginChallenge> =
    new Map();

  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  private deleteChallengeCache(requestId: string): void {
    const cachedChallenge = UserService.challengeCache.get(requestId);

    if (cachedChallenge) {
      clearTimeout(cachedChallenge.removalTask);
      UserService.challengeCache.delete(requestId);
    }
  }

  public async generateChallenge(
    requestId: string,
    user: UserEntity,
  ): Promise<LoginChallenge> {
    const challenge: LoginChallenge = {
      requestId,
      question: '',
      answer: '',
      expires: new Date(Date.now() + byMinutes(5)),
      presignedToken: await sign(
        {
          userId: user.id,
          level: user.role.level,
        },
        user.secret,
        { expiresIn: '1h' },
      ),
      removalTask: null,
    };

    challenge.removalTask = setTimeout(() => {
      const cachedChallenge = UserService.challengeCache.get(requestId);

      if (+cachedChallenge.expires < Date.now())
        UserService.challengeCache.delete(requestId);
    }, byMinutes(5));

    if (UserService.challengeCache.has(requestId))
      this.deleteChallengeCache(requestId);

    challenge.question = randomString(64, randomBytes(32).toString('utf-8'));
    challenge.answer = generateAnswer(challenge.question, user.password);

    UserService.challengeCache.set(requestId, challenge);

    return { ...challenge };
  }

  public validateAnswer(
    requestId: string,
    answer: string,
  ): AnswerValidationErrors | string {
    const challenge = UserService.challengeCache.get(requestId);

    if (!challenge) return AnswerValidationErrors.NOT_FOUND;

    if (+challenge.expires < Date.now()) {
      this.deleteChallengeCache(requestId);
      return AnswerValidationErrors.EXPIRED;
    }

    if (challenge.answer === answer) {
      this.deleteChallengeCache(requestId);
      return challenge.presignedToken;
    }

    return AnswerValidationErrors.INVALID;
  }

  public reduceUser(user: UserEntity): PublicUser {
    return omit(user, 'secret', 'password');
  }
}
