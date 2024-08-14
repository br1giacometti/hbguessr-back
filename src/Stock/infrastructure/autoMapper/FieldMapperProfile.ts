import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Field from 'Stock/domain/models/Field';
import { FieldDto } from '../dto/Field/FieldDto';
import { CreateFieldDto } from '../dto/Field/CreateFieldDto';
import FieldEntity from '../entity/FieldEntity';
import { UpdateFieldDto } from '../dto/Field/UpdateFieldDto';

@Injectable()
export class FieldMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, FieldEntity, Field);
      createMap(mapper, Field, FieldDto);
      createMap(mapper, FieldDto, Field);
      createMap(mapper, CreateFieldDto, Field);
      createMap(mapper, UpdateFieldDto, Field);
    };
  }
}
