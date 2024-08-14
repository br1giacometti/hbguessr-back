import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import LocationEntity from '../entity/LocationEntity';
import { LocationDto } from '../dto/Location/LocationDto';
import { CreateLocationDto } from '../dto/Location/CreateLocationDto';
import { UpdateLocationDto } from '../dto/Location/UpdateLocationDto';
import Location from 'Game/domain/models/Location';

@Injectable()
export class LocationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, LocationEntity, Location);
      createMap(mapper, Location, LocationDto);
      createMap(mapper, LocationDto, Location);
      createMap(mapper, CreateLocationDto, Location);
      createMap(mapper, UpdateLocationDto, Location);
    };
  }
}
