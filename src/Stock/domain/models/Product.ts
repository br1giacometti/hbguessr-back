import { AutoMap } from '@automapper/classes';
// import Warehouse from './Warehouse';
import WarehouseDetail from './WarehouseDetail';
import Category from './Category';

export default class Product {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap()
  sellPrice: number;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  categoryId: number;
  @AutoMap(() => Category)
  category?: Category;
  @AutoMap()
  barCode?: string;
  @AutoMap(() => WarehouseDetail)
  warehouses?: WarehouseDetail[];
  @AutoMap()
  warehousesIds?: number[];

  constructor(
    description: string,
    sellPrice: number,
    category?: Category,
    warehouses?: WarehouseDetail[],
    barCode?: string,
    id?: number,
    createdAt?: Date,
    warehousesIds?: number[],
  ) {
    this.id = id;
    this.description = description;
    this.sellPrice = sellPrice;
    this.createdAt = createdAt;
    this.barCode = barCode;
    this.category = category;
    this.warehouses = warehouses;
    this.warehousesIds = warehousesIds;
  }
}
