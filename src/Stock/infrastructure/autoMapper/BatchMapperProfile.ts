import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Batch from 'Stock/domain/models/Batch';
import { BatchDto } from '../dto/Batch/BatchDto';
import { CreateBatchDto } from '../dto/Batch/CreateFieldDto';
import BatchEntity from '../entity/BatchEntity';
import { UpdateBatchDto } from '../dto/Batch/UpdateBatchDto';

@Injectable()
export class BatchMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, BatchEntity, Batch);
      createMap(mapper, Batch, BatchDto);
      createMap(mapper, BatchDto, Batch);
      createMap(mapper, CreateBatchDto, Batch);
      createMap(mapper, UpdateBatchDto, Batch);
    };
  }
}
