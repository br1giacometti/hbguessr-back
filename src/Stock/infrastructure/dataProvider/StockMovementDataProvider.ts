import { Injectable } from '@nestjs/common';
import { Prisma, StockMovementType } from '@prisma/client';
import PrismaClient from 'Base/config/prisma/PrismaClient';
import StockMovement from 'Stock/domain/models/StockMovement';
import StockMovementRepository from 'Stock/application/repository/StockMovementRepository';
import StockMovementEntity from '../entity/StockMovementEntity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export default class StockMovementDataProvider
  implements StockMovementRepository
{
  client: Prisma.StockMovementDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.stockMovement;
  }

  async findById(id: number): Promise<StockMovement> {
    const stockMovementEntity = await this.client.findUnique({
      where: { id },
      include: {
        warehouseDestiny: true,
        warehouseOrigin: true,
        stockMovementDetail: { include: { product: true } },
        user: true,
        batch: true,
      },
    });
    return this.classMapper.mapAsync(
      stockMovementEntity,
      StockMovementEntity,
      StockMovement,
    );
  }

  async findAll(): Promise<StockMovement[]> {
    const stockMovementEntities = await this.client.findMany({
      include: {
        warehouseDestiny: true,
        warehouseOrigin: true,
        user: true,
        stockMovementDetail: true,
      },
      orderBy: {
        createdAt: 'desc', // Ordena por la fecha de creación de forma descendente
      },
    });

    return this.classMapper.mapArrayAsync(
      stockMovementEntities,
      StockMovementEntity,
      StockMovement,
    );
  }

  public async findAllByQuery(
    query: string,
    startDate?: string,
    endDate?: string,
  ): Promise<StockMovement[]> {
    let whereCondition: any = {};

    try {
      const now = new Date();
      const localNow = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000, // Ajustar la hora a la zona horaria local
      );

      // Definir el final del día actual para los rangos de tiempo
      const endOfToday = new Date(
        localNow.setHours(23, 59, 59, 999),
      ).toISOString();

      // Ajustar localNow para el cálculo del rango
      const startOfDay = (date: Date) =>
        new Date(date.setHours(0, 0, 0, 0)).toISOString();

      switch (query) {
        case 'day':
          whereCondition = {
            gte: startOfDay(new Date()),
            lt: endOfToday,
          };
          break;
        case 'lastDay':
          whereCondition = {
            gte: startOfDay(new Date(localNow.setDate(localNow.getDate() - 1))),
            lt: startOfDay(new Date()),
          };
          break;
        case 'lastWeek':
          whereCondition = {
            gte: startOfDay(new Date(localNow.setDate(localNow.getDate() - 7))),
            lt: endOfToday,
          };
          break;
        case 'lastMonth':
          whereCondition = {
            gte: startOfDay(
              new Date(localNow.setMonth(localNow.getMonth() - 1)),
            ),
            lt: endOfToday,
          };
          break;
        case 'lastYear':
          whereCondition = {
            gte: startOfDay(
              new Date(localNow.setFullYear(localNow.getFullYear() - 1)),
            ),
            lt: endOfToday,
          };
          break;
        case 'custom':
          if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Verifica si las fechas son válidas
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
              throw new Error('Invalid date format');
            }

            whereCondition = {
              gte: start.toISOString(),
              lte: end.toISOString(),
            };
          } else {
            throw new Error('Missing startDate or endDate for custom query');
          }
          break;
        default:
          throw new Error('Invalid query parameter');
      }

      // Filtro final aplicado en la consulta
      const filters: any = {
        createdAt: whereCondition,
      };

      const stockMovementEntities = await this.client.findMany({
        where: filters,
        include: {
          warehouseDestiny: true,
          warehouseOrigin: true,
          user: true,
          stockMovementDetail: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return this.classMapper.mapArrayAsync(
        stockMovementEntities,
        StockMovementEntity,
        StockMovement,
      );
    } catch (error) {
      console.error('Error fetching stock movements:', error.message);
      throw error;
    }
  }

  async findDailyAmountMovements(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const stockMovements = await this.client.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
      select: {
        value: true,
      },
    });

    const totalAmount = stockMovements.reduce(
      (sum, movement) => sum + movement.value,
      0,
    );
    return totalAmount;
  }

  async findLastMovements(): Promise<StockMovement[]> {
    const stockMovementEntities = await this.client.findMany({
      include: {
        warehouseDestiny: true,
        warehouseOrigin: true,
        user: true,
        stockMovementDetail: true,
      },
      orderBy: {
        createdAt: 'desc', // Ordena por la fecha de creación de forma descendente
      },
      take: 10, // Limita los resultados a las últimas 10 ventas
    });

    return this.classMapper.mapArrayAsync(
      stockMovementEntities,
      StockMovementEntity,
      StockMovement,
    );
  }

  async insert(stockMovement: StockMovement): Promise<StockMovement> {
    try {
      const stockMovementEntity = await this.client.create({
        data: {
          description: stockMovement.description,
          stockMovementDetail: {
            create: stockMovement.stockMovementDetail,
          },
          movementType: StockMovementType[stockMovement.movementType],
          value: stockMovement.value,
          warehouseDestiny: stockMovement.warehouseDestiny
            ? { connect: { id: stockMovement.warehouseDestiny.id } }
            : undefined,
          warehouseOrigin: stockMovement.warehouseOrigin
            ? { connect: { id: stockMovement.warehouseOrigin.id } }
            : undefined,
          user: { connect: { id: stockMovement.user.id } },
          voucherDescription: stockMovement.voucherDescription,
          batch: stockMovement.batch?.id
            ? { connect: { id: stockMovement.batch.id } }
            : undefined,
          aplicator: stockMovement.aplicator?.id
            ? { connect: { id: stockMovement.aplicator.id } }
            : undefined,
          wasFactured: stockMovement.wasFactured,
          factureLink: stockMovement.factureLink,
        },
        include: {
          warehouseDestiny: true,
          warehouseOrigin: true,
          stockMovementDetail: true,
          user: true,
        },
      });
      return this.classMapper.mapAsync(
        stockMovementEntity,
        StockMovementEntity,
        StockMovement,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    partialStockMovement: Partial<StockMovement>,
  ): Promise<StockMovement> {
    try {
      console.log(partialStockMovement.factureLink);
      const stockMovementEntity = await this.client.update({
        data: {
          factureLink: partialStockMovement.factureLink,
        },
        where: {
          id,
        },
      });
      return this.classMapper.mapAsync(
        stockMovementEntity,
        StockMovementEntity,
        StockMovement,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
