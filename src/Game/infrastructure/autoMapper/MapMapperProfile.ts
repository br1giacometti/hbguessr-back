import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import MapEntity from '../entity/MapEntity';
import { MapDto } from '../dto/Map/MapDto';
import { CreateMapDto } from '../dto/Map/CreateMapDto';
import { UpdateMapDto } from '../dto/Map/UpdateMapDto';
import Map from 'Game/domain/models/Map';

@Injectable()
export class MapMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, MapEntity, Map);
      createMap(mapper, Map, MapDto);
      createMap(mapper, MapDto, Map);
      createMap(mapper, CreateMapDto, Map);
      createMap(mapper, UpdateMapDto, Map);
    };
  }
}
