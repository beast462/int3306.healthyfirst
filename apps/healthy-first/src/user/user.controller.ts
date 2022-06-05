import { ErrorCodes } from '@/common/constants/error-codes';
import { CurrentUser } from '@/common/decorators/current-user';
import { ResponseDTO } from '@/common/dto/response.dto';
import { CreateUserBodyDTO } from '@/common/dto/user/create-user.body.dto';
import { GetUserCreationsParamDTO } from '@/common/dto/user/get-user-creations.param.dto';
import { GetUserCreationsQueryDTO } from '@/common/dto/user/get-user-creations.query.dto';
import { GetUserCreationsResDTO } from '@/common/dto/user/get-user-creations.res.dto';
import { GetUserParamDTO } from '@/common/dto/user/get-user.param.dto';
import { GetUsersQueryDTO } from '@/common/dto/user/get-users.query.dto';
import { UserEntity } from '@/common/entities';
import { createError } from '@/common/helpers/create-error';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  NotFoundException,
  NotImplementedException,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { RoleService } from '../role/role.service';
import { CreateUserErrors, UserService } from './user.service';
import { ResponsibleAreaService } from '../responsible-area/responsible-area.service';

@Controller('/api/user')
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly responsibleAreaService: ResponsibleAreaService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  public async getUsers(
    @Query() conditions: GetUsersQueryDTO,
  ): Promise<ResponseDTO<UserEntity[]>> {
    return new ResponseDTO(
      HttpStatus.OK,
      [],
      ErrorCodes.SUCCESS,
      [],
      // await this.userService.getUsers(conditions),
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId')
  public async getUser(
    @Param() { userId: _userId }: GetUserParamDTO,
    @CurrentUser() user: UserEntity,
  ): Promise<ResponseDTO<UserEntity>> {
    if (_userId === 'me')
      return new ResponseDTO(HttpStatus.OK, [], ErrorCodes.SUCCESS, user);

    if (_userId.match(/\D/))
      createError(BadRequestException, ErrorCodes.USERID_INVALID);

    const userId = Number(_userId);

    return new ResponseDTO(
      HttpStatus.OK,
      [],
      ErrorCodes.SUCCESS,
      await this.userService.getUserById(userId),
    );
  }

  @Post()
  public async createUser(
    @CurrentUser() user: UserEntity,
    @Body()
    {
      username,
      displayName,
      email,
      role: roleId,
      responsibleLocationCode,
    }: CreateUserBodyDTO,
  ): Promise<ResponseDTO<UserEntity>> {
    const role = await this.roleService.getRoleById(roleId);

    if (!role) createError(NotFoundException, ErrorCodes.ROLE_DOES_NOT_EXIST);

    if (role.level <= user.role.level)
      createError(ForbiddenException, ErrorCodes.USER_CREATION_RESTRICTED);

    const createUserResult = await this.userService.createUser(
      username,
      displayName,
      email,
      role,
      user.id,
    );

    if (createUserResult instanceof UserEntity) {
      const createResponsibleForUser =
        await this.responsibleAreaService.createResponsibleArea({
          userId: createUserResult.id,
          responsibleLocationCode: responsibleLocationCode,
        });

      return new ResponseDTO(
        HttpStatus.CREATED,
        [],
        ErrorCodes.SUCCESS,
        createUserResult,
      );
    }

    switch (createUserResult) {
      case CreateUserErrors.USERNAME_EXISTS:
        createError(BadRequestException, ErrorCodes.USERNAME_ALREADY_EXISTS);

      case CreateUserErrors.EMAIL_EXISTS:
        createError(BadRequestException, ErrorCodes.EMAIL_ALREADY_EXISTS);

      case CreateUserErrors.BOTH:
        createError(
          BadRequestException,
          ErrorCodes.USERNAME_AND_EMAIL_ALREADY_EXIST,
        );

      default:
        createError(NotImplementedException, ErrorCodes.UNKNOWN_ERROR);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId/creation')
  public async getUserCreations(
    @CurrentUser() currentUser: UserEntity,
    @Param() { userId: _userId }: GetUserCreationsParamDTO,
    @Query()
    { limit, offset, order, orderBy }: GetUserCreationsQueryDTO,
  ): Promise<ResponseDTO<GetUserCreationsResDTO>> {
    let userId: number;

    if (_userId === 'me') userId = currentUser.id;
    else if (_userId.match(/\D/))
      createError(BadRequestException, ErrorCodes.USERID_INVALID);
    else userId = Number(_userId);
    const total = await this.userService.getCreationsCount(userId);
    const creations = await this.userService.getCreations(
      userId,
      limit ?? Number.MAX_SAFE_INTEGER,
      offset ?? 0,
      order ?? 'asc',
      orderBy ?? 'id',
    );

    return new ResponseDTO(HttpStatus.OK, [], ErrorCodes.SUCCESS, {
      total,
      creations,
    });
  }
}
