import StockMovement from 'Stock/domain/models/StockMovement';

export default abstract class StockMovementRepository {
  abstract findById(id: number): Promise<StockMovement>;
  abstract findAll(): Promise<StockMovement[]>;
  abstract insert(stockMovement: StockMovement): Promise<StockMovement>;
  abstract findLastMovements(): Promise<StockMovement[]>;
  abstract update(
    id: number,
    entity: Partial<StockMovement>,
  ): Promise<StockMovement>;
  abstract findDailyAmountMovements(): Promise<number>;
  abstract findAllByQuery(
    query: string,
    startDate: string,
    endDate: string,
  ): Promise<StockMovement[]>;
}
