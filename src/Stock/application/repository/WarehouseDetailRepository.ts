import BaseRepository from 'Base/repository/BaseRepository';
import WarehouseDetail from 'Stock/domain/models/WarehouseDetail';

export default abstract class WarehouseDetailRepository {
  abstract insert(warehouseDetail: WarehouseDetail): Promise<WarehouseDetail>;
  abstract update(
    id: number,
    warehouseDetail: WarehouseDetail,
  ): Promise<WarehouseDetail>;
  abstract findAllByWarehouse(idWarehouse: number): Promise<WarehouseDetail[]>;
  abstract findManyByWarehouseIdAndProductsIds(
    idWarehouse: number,
    idsProduct: number[],
  ): Promise<WarehouseDetail[]>;
  abstract findAllByProduct(idProduct: number): Promise<WarehouseDetail[]>;
  abstract findById(warehouseDetailId: number): Promise<WarehouseDetail>;
  abstract updateMany(warehouseDetail: WarehouseDetail[]): Promise<boolean>;
  abstract insertMany(warehouseDetail: WarehouseDetail[]): Promise<boolean>;
  abstract updateQuantity(id: number, quantity: number);
}
