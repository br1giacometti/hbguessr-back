import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import StockMovement from 'Stock/domain/models/StockMovement';
import StockMovementEntity from '../entity/StockMovementEntity';
import { StockMovementDto } from '../dto/StockMovement/StockMovementDto';
import { CreateStockMovementDto } from '../dto/StockMovement/CreateStockMovementDto';

@Injectable()
export class StockMovementProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, StockMovementEntity, StockMovement);
      createMap(mapper, StockMovement, StockMovementDto);
      createMap(mapper, StockMovementDto, StockMovement);
      createMap(mapper, CreateStockMovementDto, StockMovement);
    };
  }
}
