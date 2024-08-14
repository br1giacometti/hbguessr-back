import { AutoMap } from '@automapper/classes';
import Product from 'Stock/domain/models/Product';
import StockMovement from 'Stock/domain/models/StockMovement';

export class StockMovementDetailDto {
  @AutoMap()
  id: number;
  @AutoMap()
  productId: number;
  @AutoMap(() => Product)
  product?: Product;
  @AutoMap()
  quantity: number;
  @AutoMap()
  stockMovementId: number;
  @AutoMap()
  sellPrice: number; // Agregar sellPrice en lugar de buyPrice
  @AutoMap(() => StockMovement)
  stockMovement: StockMovement;
}
