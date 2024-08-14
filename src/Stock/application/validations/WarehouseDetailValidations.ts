import { Injectable } from '@nestjs/common';
import WarehouseDetail from 'Stock/domain/models/WarehouseDetail';
import WarehouseDetailNotFoundException from '../exception/WarehouseDetailNotFoundException';

@Injectable()
export default class WarehouseDetailValidations {
  validateExistingWarehouse(warehouse: WarehouseDetail): boolean {
    if (warehouse === null) {
      throw new WarehouseDetailNotFoundException();
    }
    return true;
  }
}
