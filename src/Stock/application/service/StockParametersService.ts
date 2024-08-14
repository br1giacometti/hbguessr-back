import { Injectable } from '@nestjs/common';

import StockParametersRepository from '../repository/StockParametersRepository';
import StockParameters from 'Stock/domain/models/StockParameters';
import StockParametersValidations from '../validations/StockParametersValidations';
import FieldService from './FieldService';

@Injectable()
export default class StockParametersService {
  constructor(
    private readonly repository: StockParametersRepository,
    private readonly validator: StockParametersValidations,
  ) {}

  async createStockParameters(
    StockParameters: StockParameters,
  ): Promise<StockParameters> {
    const StockParametersCreated = await this.repository.insert({
      dailySellAmount: StockParameters.dailySellAmount,
      id: StockParameters.id,
      maxSellAmount: StockParameters.maxSellAmount,
    });
    return StockParametersCreated;
  }

  async updateStockParameters(
    id: number,
    StockParameters: StockParameters,
  ): Promise<StockParameters> {
    const StockParametersCreated = await this.repository.update(id, {
      dailySellAmount: StockParameters.dailySellAmount,
      maxSellAmount: StockParameters.maxSellAmount,
    });
    return StockParametersCreated;
  }

  async deleteStockParameters(
    StockParametersId: number,
  ): Promise<StockParameters> {
    return await this.repository.delete(StockParametersId);
  }

  async findStockParametersById(
    StockParametersId: number,
  ): Promise<StockParameters> {
    this.validator.validateStockParametersId(StockParametersId);
    const StockParameters = await this.repository.findById(StockParametersId);
    this.validator.validateExistingStockParameters(StockParameters);
    return StockParameters;
  }

  async fetchAllStockParameterss(): Promise<StockParameters[]> {
    const StockParameters = await this.repository.findAll();
    return StockParameters;
  }
}
