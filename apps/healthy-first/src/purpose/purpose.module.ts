import { PurposeEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurposeController } from './purpose.controller';
import { PurposeService } from './purpose.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurposeEntity])],
  controllers: [PurposeController],
  providers: [PurposeService],
})
export class PurposeModule {}
