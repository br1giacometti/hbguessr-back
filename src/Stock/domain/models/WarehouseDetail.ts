import { AutoMap } from '@automapper/classes';
import Product from './Product';

export default class WarehouseDetail {
  @AutoMap()
  id?: number;
  @AutoMap()
  productId: number;
  @AutoMap(() => Product)
  product?: Product;
  @AutoMap()
  warehouseId: number;
  @AutoMap()
  quantity: number;
  @AutoMap()
  sellPrice: number;
  @AutoMap()
  lastUpdate: Date;

  constructor(
    quantity: number,
    warehouseId: number,
    sellPrice: number,
    productId: number,
    lastUpdate: Date,
    product?: Product,
    id?: number,
  ) {
    this.quantity = quantity;
    this.warehouseId = warehouseId;
    this.sellPrice = sellPrice;
    this.lastUpdate = lastUpdate;
    this.productId = productId;
    this.product = product;
    this.id = id;
  }
}
