import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { RoleEntity, UserEntity } from '@/common/entities';
import { randomRange } from '@/common/helpers/random-range';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MailService } from '../mail/mail.service';
import { PublicUser } from '@/common/models/public-user';

export enum CreateUserErrors {
  USERNAME_EXISTS = 0,
  EMAIL_EXISTS = 1,
  BOTH = 2,
}

@Injectable()
export class UserService {
  public constructor(
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

  public hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  public async createUser(
    username: string,
    displayName: string,
    email: string,
    role: RoleEntity,
    creatorId?: number,
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
      secret: this.hashPassword(v4()),
      role,
      creatorId,
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

  public async getCreationsCount(creatorId: number): Promise<number> {
    return await this.userRepository.count({
      where: { creatorId },
    });
  }

  public async getCreations(
    creatorId: number,
    limit: number,
    offset: number,
    order: 'asc' | 'desc',
    orderBy: keyof PublicUser,
  ): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { creatorId },
      order: {
        [orderBy]: order.toUpperCase(),
      },
      take: limit,
      skip: offset,
      relations: ['role'],
    });
  }
}
