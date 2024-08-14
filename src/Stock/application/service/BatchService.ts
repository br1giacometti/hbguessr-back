import { Injectable } from '@nestjs/common';

import BatchRepository from '../repository/BatchRepository';
import Batch from 'Stock/domain/models/Batch';
import BatchValidations from '../validations/BatchValidations';
import FieldService from './FieldService';

@Injectable()
export default class BatchService {
  constructor(
    private readonly repository: BatchRepository,
    private readonly validator: BatchValidations,
    private readonly fieldService: FieldService,
  ) {}

  async createBatch(batch: Batch): Promise<Batch> {
    await this.fieldService.findFieldById(batch.fieldId);
    const batchCreated = await this.repository.insert({
      description: batch.description,
      id: batch.id,
      hectares: batch.hectares,
      fieldId: batch.fieldId,
    });
    return batchCreated;
  }

  async updateBatch(id: number, batch: Batch): Promise<Batch> {
    const batchCreated = await this.repository.update(id, {
      description: batch.description,
    });
    return batchCreated;
  }

  async deleteBatch(batchId: number): Promise<Batch> {
    return await this.repository.delete(batchId);
  }

  async findBatchById(batchId: number): Promise<Batch> {
    this.validator.validateBatchId(batchId);
    const batch = await this.repository.findById(batchId);
    this.validator.validateExistingBatch(batch);
    return batch;
  }

  async fetchAllbatchs(): Promise<Batch[]> {
    const batch = await this.repository.findAll();
    return batch;
  }
}
