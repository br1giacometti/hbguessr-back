import StockMovement from 'Stock/domain/models/StockMovement';
import { CreateStockMovementDto } from 'Stock/infrastructure/dto/StockMovement/CreateStockMovementDto';

export abstract class AbstractStockMovement {
  constructor(protected readonly movement: CreateStockMovementDto) {}

  public abstract generateMovement(): Promise<StockMovement>;
}
