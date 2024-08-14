import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import StockMovementDetail from 'Stock/domain/models/StockMovementDetail';
import StockMovementDetailEntity from '../entity/StockMovementDetailEntity';
import WarehouseDescriptionAlreadyInUseException from 'Stock/application/exception/WarehouseDescriptionAlreadyInUseException';
import StockMovementDetailRepository from 'Stock/application/repository/StockMovementDetailRepository';

@Injectable()
export default class StockMovementDetailDataProvider
  implements StockMovementDetailRepository
{
  client: Prisma.StockMovementDetailDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.stockMovementDetail;
  }

  async findAll(): Promise<StockMovementDetail[]> {
    const stockMovementDetails = await this.client.findMany();

    return this.classMapper.mapArrayAsync(
      stockMovementDetails,
      StockMovementDetailEntity,
      StockMovementDetail,
    );
  }

  async insert(
    stockMovementDetail: StockMovementDetail,
  ): Promise<StockMovementDetail> {
    try {
      const stockMovementDetailEntity = await this.client.create({
        data: {
          sellPrice: stockMovementDetail.sellPrice,
          quantity: stockMovementDetail.quantity,
          product: { connect: { id: stockMovementDetail.productId } },
          stockMovement: {
            connect: { id: stockMovementDetail.stockMovementId },
          },
        },
      });

      return this.classMapper.mapAsync(
        stockMovementDetailEntity,
        StockMovementDetailEntity,
        StockMovementDetail,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new WarehouseDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async update(
    id: number,
    stockMovementDetail: StockMovementDetail,
  ): Promise<StockMovementDetail> {
    try {
      const stockMovementDetailEntity = await this.client.update({
        where: { id: id },
        data: {
          sellPrice: stockMovementDetail.sellPrice,
          quantity: stockMovementDetail.quantity,
          product: { connect: { id: stockMovementDetail.productId } },
          stockMovement: {
            connect: { id: stockMovementDetail.stockMovementId },
          },
        },
      });

      return this.classMapper.mapAsync(
        stockMovementDetailEntity,
        StockMovementDetailEntity,
        StockMovementDetail,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new WarehouseDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findById(
    stockMovementDetailId: number,
  ): Promise<StockMovementDetail | null> {
    const sotckMovementDetailEntity = await this.client.findUnique({
      where: { id: stockMovementDetailId },
    });
    return this.classMapper.mapAsync(
      sotckMovementDetailEntity,
      StockMovementDetailEntity,
      StockMovementDetail,
    );
  }

  async findAllByStockMovementId(
    idStockMovement: number,
  ): Promise<StockMovementDetail[]> {
    const stockMovementDetail = await this.client.findMany({
      where: { stockMovementId: idStockMovement },
    });

    return this.classMapper.mapArrayAsync(
      stockMovementDetail,
      StockMovementDetailEntity,
      StockMovementDetail,
    );
  }

  async delete(id: number): Promise<StockMovementDetail> {
    const stockMovementEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(
      stockMovementEntity,
      StockMovementDetailEntity,
      StockMovementDetail,
    );
  }
}
