import { Test, TestingModule } from '@nestjs/testing';
import { UserUtilsController } from './user-utils.controller';

describe('UserUtilsController', () => {
  let controller: UserUtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserUtilsController],
    }).compile();

    controller = module.get<UserUtilsController>(UserUtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
