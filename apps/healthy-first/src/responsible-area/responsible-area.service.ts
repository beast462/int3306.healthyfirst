import { ResponsibleAreaEntity, UserEntity } from '@/common/entities';
import { Specialist } from '@/common/models/specialist';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class ResponsibleAreaService {
  constructor(
    @InjectRepository(ResponsibleAreaEntity)
    private readonly responsibleAreaRepository: Repository<ResponsibleAreaEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getAllResponsibleAreas(): Promise<ResponsibleAreaEntity[]> {
    return this.responsibleAreaRepository.find();
  }

  public async getResponsibleAreaByUserId(
    userId: number,
  ): Promise<ResponsibleAreaEntity> {
    return this.responsibleAreaRepository.findOne({
      where: { userId: userId },
    });
  }

  public async getResponsibleAreaByResponsibleLocationCode(
    responsibleLocationCode: number,
  ): Promise<ResponsibleAreaEntity[]> {
    return this.responsibleAreaRepository.find({
      where: {
        responsibleLocationCode: Raw(
          (alias) =>
            `if (${responsibleLocationCode} = 0x1, ${alias} > 0x1 and ${alias} < 0x100000000, if (${responsibleLocationCode} > 0x1 and ${responsibleLocationCode} < 0x10000, ${alias} >= 0x10000 and ${alias} < 0x1000000 and ${alias} & 0xffff = ${responsibleLocationCode}, ${alias} < 1 ))`,
        ),
      },
    });
  }

  public async getSpecialist(
    responsibleAreas: ResponsibleAreaEntity[],
  ): Promise<Specialist[]> {
    const specialists = [];
    for (const responsibleArea of responsibleAreas) {
      const specialist = await this.userRepository.find({
        where: {
          id: responsibleArea.userId,
        },
      });
      const responsibleCode = await this.responsibleAreaRepository.find({
        where: {
          userId: responsibleArea.userId,
        },
      });
      const specialistWithResponsibleArea = {
        id: responsibleArea.id,
        userId: specialist[0].id,
        displayName: specialist[0].displayName,
        email: specialist[0].email,
        roleId: specialist[0].roleId,
        responsibleLocationCode: responsibleCode[0].responsibleLocationCode,
      };
      specialists.push(specialistWithResponsibleArea);
    }
    return specialists;
  }

  public async createResponsibleArea(
    newResponsibleArea: Omit<
      ResponsibleAreaEntity,
      'id' | 'user' | 'responsibleLocation'
    >,
  ): Promise<ResponsibleAreaEntity> {
    return (await this.responsibleAreaRepository.insert(newResponsibleArea))
      .generatedMaps[0] as ResponsibleAreaEntity;
  }

  public async deleteResponsibleAreaByUserId(
    removedResponsibleArea: ResponsibleAreaEntity,
  ): Promise<ResponsibleAreaEntity> {
    await this.responsibleAreaRepository.remove(removedResponsibleArea);
    return removedResponsibleArea;
  }
}
