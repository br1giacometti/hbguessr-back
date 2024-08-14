import { Injectable } from '@nestjs/common';
import Aplicator from 'Stock/domain/models/Aplicator';
import AplicatorNotFoundException from '../exception/AplicatorNotFoundException';

@Injectable()
export default class AplicatorValidations {
  validateExistingAplicator(aplicator: Aplicator): boolean {
    if (aplicator === null) {
      throw new AplicatorNotFoundException();
    }
    return true;
  }
  validateAplicatorId(aplicatorId: number): boolean {
    if (aplicatorId === undefined || aplicatorId === null) {
      throw new AplicatorNotFoundException();
    }
    return true;
  }
}
