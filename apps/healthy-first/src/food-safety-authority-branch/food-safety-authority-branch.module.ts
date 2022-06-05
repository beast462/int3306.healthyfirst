import { FoodSafetyAuthorityBranchEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodSafetyAuthorityBranchController } from './food-safety-authority-branch.controller';
import { FoodSafetyAuthorityBranchService } from './food-safety-authority-branch.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodSafetyAuthorityBranchEntity])],
  controllers: [FoodSafetyAuthorityBranchController],
  providers: [FoodSafetyAuthorityBranchService],
})
export class FoodSafetyAuthorityBranchModule {}
