import { Cache } from 'cache-manager';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';

import { UserEntity } from '@/common/entities';
import { generateAnswer } from '@/common/helpers/generate-answer';
import { sign } from '@/common/helpers/jwt';
import { randomString } from '@/common/helpers/random-string';
import { LoginChallenge } from '@/common/models/login-challenge';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export enum AnswerValidationErrors {
  NOT_FOUND = 0,
  INVALID = 2,
}

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
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

  public async generateChallenge(
    requestId: string,
    user: UserEntity,
  ): Promise<LoginChallenge> {
    const challenge: LoginChallenge = {
      requestId,
      question: '',
      answer: '',
      presignedToken: await sign(
        {
          userId: user.id,
          level: user.role,
        },
        user.secret,
        { expiresIn: '1h' },
      ),
    };

    challenge.question = randomString(64, randomBytes(32).toString('utf-8'));
    challenge.answer = generateAnswer(challenge.question, user.password);

    this.cacheManager.set(requestId, challenge);

    return { ...challenge };
  }

  public async validateAnswer(
    requestId: string,
    answer: string,
  ): Promise<AnswerValidationErrors | string> {
    const challenge = await this.cacheManager.get<LoginChallenge>(requestId);

    if (!challenge) return AnswerValidationErrors.NOT_FOUND;

    if (challenge.answer === answer) {
      this.cacheManager.del(requestId);
      return challenge.presignedToken;
    }

    return AnswerValidationErrors.INVALID;
  }
}
