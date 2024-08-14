import { AutoMap } from '@automapper/classes';
import Product from 'Stock/domain/models/Product';
import { WarehouseDetail as IWarehouseDetailEntity } from '@prisma/client';
import ProductEntity from './ProductEntity';

class WarehouseDetailEntity implements IWarehouseDetailEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  productId: number;
  @AutoMap()
  warehouseId: number;
  @AutoMap()
  quantity: number;
  @AutoMap()
  sellPrice: number;
  @AutoMap()
  lastUpdate: Date;
  @AutoMap(() => ProductEntity)
  product: ProductEntity;
}
export default WarehouseDetailEntity;
