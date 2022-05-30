import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('/api/role')
export class RoleController {
  public constructor(private readonly roleService: RoleService) {}
}
