import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import WarehouseDetailEntity from '../entity/WarehouseDetailEntity';
import WarehouseDetail from 'Stock/domain/models/WarehouseDetail';
import { WarehouseDetailDto } from '../dto/WarehouseDetail/WarehouseDetailDto';

@Injectable()
export class WarehouseDetailMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, WarehouseDetailEntity, WarehouseDetail);
      createMap(mapper, WarehouseDetail, WarehouseDetailDto);
      createMap(mapper, WarehouseDetailDto, WarehouseDetail);
    };
  }
}
