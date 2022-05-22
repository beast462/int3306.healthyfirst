import { Cache } from 'cache-manager';
import { createHash, randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { RoleEntity, UserEntity } from '@/common/entities';
import { generateAnswer } from '@/common/helpers/generate-answer';
import { sign } from '@/common/helpers/jwt';
import { randomString } from '@/common/helpers/random-string';
import { LoginChallenge } from '@/common/models/login-challenge';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomRange } from '@/common/helpers/random-range';
import { MailService } from '../mail/mail.service';

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

  public hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  public async createUser(
    username: string,
    displayName: string,
    email: string,
    role: RoleEntity,
  ): Promise<UserEntity> {
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
