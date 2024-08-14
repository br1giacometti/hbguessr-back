import { AutoMap } from '@automapper/classes';
import { Warehouse as IWarehouseEntity } from '@prisma/client';
import Product from 'Stock/domain/models/Product';
import WarehouseDetailEntity from './WarehouseDetailEntity';

class WarehouseEntity implements IWarehouseEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap()
  sellPrice: number;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  minimumQuantity: number;
  @AutoMap(() => Product)
  products: Product[];
  @AutoMap()
  productsIds: number[];
  @AutoMap(() => WarehouseDetailEntity)
  warehouseDetails: WarehouseDetailEntity[];
}

export default WarehouseEntity;
