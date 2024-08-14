import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import StockParametersRepository from 'Stock/application/repository/StockParametersRepository';
import StockParameters from 'Stock/domain/models/StockParameters';
import StockParametersEntity from '../entity/StockParametersEntity';
import StockParametersDescriptionAlreadyInUseException from 'Stock/application/exception/StockParametersDescriptionAlreadyInUseException';
import StockParametersNotFoundException from 'Stock/application/exception/StockParametersNotFoundException';

@Injectable()
export default class StockParametersDataProvider
  implements StockParametersRepository
{
  client: Prisma.StockParametersDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.stockParameters;
  }

  findStockParametersByDescription: (
    description: string,
  ) => Promise<StockParameters>;

  async insert(stockparameters: StockParameters): Promise<StockParameters> {
    try {
      const stockparametersEntity = await this.client.create({
        data: {
          dailySellAmount: stockparameters.dailySellAmount,
          maxSellAmount: stockparameters.maxSellAmount,
        },
      });

      return this.classMapper.mapAsync(
        stockparametersEntity,
        StockParametersEntity,
        StockParameters,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new StockParametersDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findById(id: number): Promise<StockParameters | null> {
    const stockparametersEntity = await this.client.findUnique({
      where: { id },
    });
    return this.classMapper.mapAsync(
      stockparametersEntity,
      StockParametersEntity,
      StockParameters,
    );
  }

  async findAll(): Promise<StockParameters[]> {
    const stockparameterses = await this.client.findMany();

    return this.classMapper.mapArrayAsync(
      stockparameterses,
      StockParametersEntity,
      StockParameters,
    );
  }

  async delete(id: number): Promise<StockParameters> {
    const stockparametersEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(
      stockparametersEntity,
      StockParametersEntity,
      StockParameters,
    );
  }

  async update(
    id: number,
    partialStockParameters: Partial<StockParameters>,
  ): Promise<StockParameters> {
    try {
      const stockparametersEntity = await this.client.update({
        data: {
          maxSellAmount: partialStockParameters.maxSellAmount,
          dailySellAmount: partialStockParameters.dailySellAmount,
        },
        where: {
          id,
        },
      });
      return this.classMapper.mapAsync(
        stockparametersEntity,
        StockParametersEntity,
        StockParameters,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new StockParametersNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
