import { FoodSampleEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodSampleController } from './food-sample.controller';
import { FoodSampleService } from './food-sample.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodSampleEntity])],
  controllers: [FoodSampleController],
  providers: [FoodSampleService],
})
export class FoodSampleModule {}
