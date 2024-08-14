import StockMovementDetail from 'Stock/domain/models/StockMovementDetail';

export default abstract class StockMovementDetailRepository {
  abstract findAllByStockMovementId(
    idStockMovement: number,
  ): Promise<StockMovementDetail[]>;
}
