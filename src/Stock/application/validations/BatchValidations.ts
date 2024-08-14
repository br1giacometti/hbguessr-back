import { Injectable } from '@nestjs/common';
import Batch from 'Stock/domain/models/Batch';
import BatchNotFoundException from '../exception/BatchNotFoundException';

@Injectable()
export default class BatchValidations {
  validateExistingBatch(batch: Batch): boolean {
    if (batch === null) {
      throw new BatchNotFoundException();
    }
    return true;
  }
  validateBatchId(batchId: number): boolean {
    if (batchId === null) {
      throw new BatchNotFoundException();
    }
    return true;
  }
}
