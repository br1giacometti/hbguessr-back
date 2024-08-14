import { AutoMap } from '@automapper/classes';
import { StockMovementDetail as IStockMovementDetailEntity } from '@prisma/client';
import StockMovementEntity from './StockMovementEntity';
import ProductEntity from './ProductEntity';

class StockMovementDetailEntity implements IStockMovementDetailEntity {
  @AutoMap()
  stockMovementId: number;
  @AutoMap(() => StockMovementEntity)
  stockMovement: StockMovementEntity;
  @AutoMap()
  id: number;
  @AutoMap()
  productId: number;
  @AutoMap()
  sellPrice: number;
  @AutoMap()
  quantity: number;
  @AutoMap()
  product: ProductEntity;
}
export default StockMovementDetailEntity;
