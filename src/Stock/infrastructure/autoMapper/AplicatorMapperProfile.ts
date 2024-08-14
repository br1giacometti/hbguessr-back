import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Aplicator from 'Stock/domain/models/Aplicator';
import { AplicatorDto } from '../dto/Aplicator/AplicatorDto';
import { CreateAplicatorDto } from '../dto/Aplicator/CreateFieldDto';
import AplicatorEntity from '../entity/AplicatorEntity';

@Injectable()
export class AplicatorMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, AplicatorEntity, Aplicator);
      createMap(mapper, Aplicator, AplicatorDto);
      createMap(mapper, AplicatorDto, Aplicator);
      createMap(mapper, CreateAplicatorDto, Aplicator);
      createMap(mapper, Aplicator, CreateAplicatorDto);
    };
  }
}
