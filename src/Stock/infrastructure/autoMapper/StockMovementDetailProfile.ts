import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import StockMovementDetail from 'Stock/domain/models/StockMovementDetail';
import { StockMovementDetailDto } from '../dto/StockMovement/StockMovementDetailDto';
import StockMovementDetailEntity from '../entity/StockMovementDetailEntity';

@Injectable()
export class StockMovementDetailProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, StockMovementDetailEntity, StockMovementDetail);

      // Mapeo de StockMovementDetail a StockMovementDetailDto
      createMap(
        mapper,
        StockMovementDetail,
        StockMovementDetailDto,
        forMember(
          (destination) => destination.sellPrice,
          mapFrom((source) => source.sellPrice), // Usar sellPrice como origen
        ),
      );

      // Mapeo de StockMovementDetailDto a StockMovementDetail
      createMap(
        mapper,
        StockMovementDetailDto,
        StockMovementDetail,
        forMember(
          (destination) => destination.sellPrice,
          mapFrom((source) => source.sellPrice), // Usar sellPrice como origen
        ),
      );
    };
  }
}
