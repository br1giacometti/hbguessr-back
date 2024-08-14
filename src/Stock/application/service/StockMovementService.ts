import { Injectable } from '@nestjs/common';
import StockMovement from 'Stock/domain/models/StockMovement';
import { CreateStockMovementDto } from 'Stock/infrastructure/dto/StockMovement/CreateStockMovementDto';
import { StockMovementGenerator } from '../factories/StockMovementGenerator';
import StockMovementRepository from '../repository/StockMovementRepository';
import AfipService from './AfipService';

@Injectable()
export default class StockMovementService {
  constructor(
    private readonly repository: StockMovementRepository,
    private readonly movementGenerator: StockMovementGenerator,
    private readonly afipService: AfipService,
  ) {}

  async createStockMovement(
    createStockMovementDto: CreateStockMovementDto,
  ): Promise<StockMovement> {
    const movimiento = this.movementGenerator.createMovement(
      createStockMovementDto,
    );
    return await this.repository.insert(await movimiento.generateMovement());
  }

  async findStockMovementById(stockMovementId: number): Promise<StockMovement> {
    const stockMovement = await this.repository.findById(stockMovementId);

    return stockMovement;
  }

  async fetchAllMovimientosStock(): Promise<StockMovement[]> {
    const stockMovement = await this.repository.findAll();

    return stockMovement;
  }

  async fetchAllMovimientosStockByQuery(
    query: string,
    startDate?: string,
    endDate?: string,
  ): Promise<StockMovement[]> {
    const stockMovement = await this.repository.findAllByQuery(
      query,
      startDate,
      endDate,
    );

    return stockMovement;
  }

  async getDailyTotalValueStockMovements(): Promise<number> {
    const stockMovement = await this.repository.findDailyAmountMovements();

    return stockMovement;
  }

  async fetchLastMovimientosStock(): Promise<StockMovement[]> {
    const stockMovement = await this.repository.findLastMovements();

    return stockMovement;
  }

  async updateLinkStockMovement(
    id: number,
    stockMovement: CreateStockMovementDto,
  ): Promise<StockMovement> {
    const pdfLink = await this.afipService.generarFacturaB(5, stockMovement);
    const stockMovementCreated = await this.repository.update(id, {
      factureLink: pdfLink,
    });
    return stockMovementCreated;
  }
}
