import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Warehouse from 'Stock/domain/models/Warehouse';
import { WarehouseDto } from '../dto/Warehouse/WarehouseDto';
import { CreateWarehouseDto } from '../dto/Warehouse/CreateWarehouseDto';
import WarehouseEntity from '../entity/WarehouseEntity';
import { UpdateWarehouseDto } from '../dto/Warehouse/UpdateWarehouseDto';

@Injectable()
export class WarehouseMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, WarehouseEntity, Warehouse);
      createMap(mapper, Warehouse, WarehouseDto);
      createMap(mapper, WarehouseDto, Warehouse);
      createMap(mapper, CreateWarehouseDto, Warehouse);
      createMap(mapper, UpdateWarehouseDto, Warehouse);
    };
  }
}
