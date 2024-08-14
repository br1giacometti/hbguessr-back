import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import StockParameters from 'Stock/domain/models/StockParameters';
import { StockParametersDto } from '../dto/StockParameters/StockParametersDto';
import { CreateStockParametersDto } from '../dto/StockParameters/CreateStockParametersDto';
import StockParametersEntity from '../entity/StockParametersEntity';
import { UpdateStockParametersDto } from '../dto/StockParameters/UpdateStockParametersDto';

@Injectable()
export class StockParametersMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, StockParametersEntity, StockParameters);
      createMap(mapper, StockParameters, StockParametersDto);
      createMap(mapper, StockParametersDto, StockParameters);
      createMap(mapper, CreateStockParametersDto, StockParameters);
      createMap(mapper, UpdateStockParametersDto, StockParameters);
    };
  }
}
