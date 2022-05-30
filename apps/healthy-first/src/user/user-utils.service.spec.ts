import { Test, TestingModule } from '@nestjs/testing';

import { UserUtilsService } from './user-utils.service';

describe('UserUtilsService', () => {
  let service: UserUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUtilsService],
    }).compile();

    service = module.get<UserUtilsService>(UserUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
