import { ResponsibleAreaEntity, UserEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleAreaController } from './responsible-area.controller';
import { ResponsibleAreaService } from './responsible-area.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResponsibleAreaEntity, UserEntity])],
  controllers: [ResponsibleAreaController],
  providers: [ResponsibleAreaService],
  exports: [ResponsibleAreaService],
})
export class ResponsibleAreaModule {}
