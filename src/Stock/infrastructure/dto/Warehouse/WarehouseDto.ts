import { AutoMap } from '@automapper/classes';
import WarehouseDetail from 'Stock/domain/models/WarehouseDetail';

export class WarehouseDto {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap(() => WarehouseDetail)
  warehouseDetails?: WarehouseDetail[];
}
