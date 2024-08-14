import { AutoMap } from '@automapper/classes';
import Product from 'Stock/domain/models/Product';

export class WarehouseDetailDto {
  @AutoMap()
  id: number;
  @AutoMap()
  productId: number;
  @AutoMap(() => Product)
  product?: Product;
  @AutoMap()
  quantity: number;
  @AutoMap()
  lastupdate: Date;
}
