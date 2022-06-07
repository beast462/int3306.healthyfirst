import { PurposeEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PurposeService {
  constructor(
    @InjectRepository(PurposeEntity)
    private readonly purposeRepository: Repository<PurposeEntity>,
  ) {}

  public async getAllPurpose(): Promise<PurposeEntity[]> {
    return this.purposeRepository.find();
  }

  public async getPurposeById(id: number): Promise<PurposeEntity> {
    return this.purposeRepository.findOne({
      where: { id: id },
    });
  }
}
