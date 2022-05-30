import { RoleEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  public constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  public async getAllRoles(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  public async getRoleById(id: number): Promise<RoleEntity> {
    return await this.roleRepository.findOne({
      where: { id },
    });
  }
}
