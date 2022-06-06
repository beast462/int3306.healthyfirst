import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { RoleEntity } from '@/common/entities';
import { Controller, Get, HttpStatus } from '@nestjs/common';

import { RoleService } from './role.service';

@Controller('/api/role')
export class RoleController {
  public constructor(private readonly roleService: RoleService) {}

  @Get()
  public async getAllRoles(): Promise<ResponseDTO<RoleEntity[]>> {
    return new ResponseDTO(
      HttpStatus.OK,
      [],
      ErrorCodes.SUCCESS,
      await this.roleService.getAllRoles(),
    );
  }
}
