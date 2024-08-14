import { Injectable } from '@nestjs/common';
import Warehouse from 'Stock/domain/models/Warehouse';
import WarehouseNotFoundException from '../exception/WarehouseNotFoundException';

@Injectable()
export default class WarehouseValidations {
  validateExistingWarehouse(warehouse: Warehouse): boolean {
    if (warehouse === null) {
      throw new WarehouseNotFoundException();
    }
    return true;
  }
  validateWarehouseId(warehouseId: number): boolean {
    if (warehouseId === null) {
      throw new WarehouseNotFoundException();
    }
    return true;
  }
}
