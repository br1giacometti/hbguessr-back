import { AutoMap } from '@automapper/classes';
import User from 'Authentication/domain/models/User';
import StockMovementType from 'Stock/domain/models/StockMovementType';
import Warehouse from 'Stock/domain/models/Warehouse';
import { StockMovementDetailDto } from './StockMovementDetailDto'; // Importar el nuevo DTO

export class StockMovementDto {
  @AutoMap()
  value: number;
  @AutoMap()
  id?: number;
  @AutoMap()
  description: string;
  @AutoMap()
  voucherDescription: string;
  @AutoMap()
  movementType: StockMovementType;
  @AutoMap(() => StockMovementDetailDto) // Usar el nuevo DTO
  stockMovementDetail: StockMovementDetailDto[];
  @AutoMap()
  date: Date;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  warehouseOriginId: number;
  @AutoMap(() => Warehouse)
  warehouseOrigin: Warehouse;
  @AutoMap()
  warehouseDestinyId: number;
  @AutoMap(() => Warehouse)
  warehouseDestiny: Warehouse;
  @AutoMap()
  user?: User;
  @AutoMap()
  batchId?: number;
  @AutoMap()
  aplicatorId?: number;
  @AutoMap()
  factureLink?: string;
}
