import { AutoMap } from '@automapper/classes';
import WarehouseDetail from './WarehouseDetail';

export default class Warehouse {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap(() => WarehouseDetail)
  warehouseDetails?: WarehouseDetail[];

  constructor(
    description: string,
    warehouseDetails?: WarehouseDetail[],
    id?: number,
  ) {
    this.id = id;
    this.description = description;
    this.warehouseDetails = warehouseDetails;
  }
}
