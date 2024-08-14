import { Injectable } from '@nestjs/common';
import StockParameters from 'Stock/domain/models/StockParameters';
import StockParametersNotFoundException from '../exception/StockParametersNotFoundException';

@Injectable()
export default class StockParametersValidations {
  validateExistingStockParameters(StockParameters: StockParameters): boolean {
    if (StockParameters === null) {
      throw new StockParametersNotFoundException();
    }
    return true;
  }
  validateStockParametersId(StockParametersId: number): boolean {
    if (StockParametersId === null) {
      throw new StockParametersNotFoundException();
    }
    return true;
  }
}
