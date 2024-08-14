import { Injectable } from '@nestjs/common';

import WarehouseRepository from '../repository/WarehouseRepository';
import WarehouseValidations from '../validations/WarehouseValidations';
import Warehouse from 'Stock/domain/models/Warehouse';

@Injectable()
export default class WarehouseService {
  constructor(
    private readonly repository: WarehouseRepository,
    private readonly validator: WarehouseValidations,
  ) {}

  async createWarehouse(warehouse: Warehouse): Promise<Warehouse> {
    const warehouseCreated = await this.repository.insert({
      description: warehouse.description,
      id: warehouse.id,
    });
    return warehouseCreated;
  }

  async updateWarehouse(id: number, warehouse: Warehouse): Promise<Warehouse> {
    const warehouseCreated = await this.repository.update(id, {
      description: warehouse.description,
    });
    return warehouseCreated;
  }

  async deleteWarehouse(warehouseId: number): Promise<Warehouse> {
    return await this.repository.delete(warehouseId);
  }

  async findWarehouseByDescription(description: string): Promise<Warehouse> {
    const warehouse = await this.repository.findWarehouseByDescription(
      description,
    );
    this.validator.validateExistingWarehouse(warehouse);
    return warehouse;
  }

  async findWarehouseById(warehouseId: number): Promise<Warehouse> {
    this.validator.validateWarehouseId(warehouseId);
    const warehouse = await this.repository.findById(warehouseId);
    this.validator.validateExistingWarehouse(warehouse);
    return warehouse;
  }

  async fetchAllWarehouses(): Promise<Warehouse[]> {
    const warehouse = await this.repository.findAll();
    return warehouse;
  }
}
