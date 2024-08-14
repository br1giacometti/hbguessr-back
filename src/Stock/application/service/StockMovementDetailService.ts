import { Injectable } from '@nestjs/common';
import StockMovementDetailRepository from '../repository/StockMovementDetailRepository';
import StockMovementDetail from 'Stock/domain/models/StockMovementDetail';

@Injectable()
export default class StockMovementDetailService {
  constructor(private readonly repository: StockMovementDetailRepository) {}

  async findAllByStockMovementId(
    idStockMovement: number,
  ): Promise<StockMovementDetail[]> {
    return await this.repository.findAllByStockMovementId(idStockMovement);
  }
}
