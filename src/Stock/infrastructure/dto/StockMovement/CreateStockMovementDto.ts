import { AutoMap } from '@automapper/classes';
import User from 'Authentication/domain/models/User';
import StockMovementType from 'Stock/domain/models/StockMovementType';
import StockMovementDetail from 'Stock/domain/models/StockMovementDetail';

export class CreateStockMovementDto {
  @AutoMap()
  value: number;
  @AutoMap()
  description: string;
  @AutoMap()
  voucherDescription: string;
  @AutoMap()
  movementType: StockMovementType;
  @AutoMap()
  stockMovementDetail: StockMovementDetail[];
  @AutoMap()
  date: Date;
  @AutoMap()
  warehouseOriginId?: number;
  @AutoMap()
  warehouseDestinyId?: number;
  @AutoMap()
  user?: User;
  @AutoMap()
  cashBoxOriginId?: number;
  @AutoMap()
  cashBoxDestinyId?: number;
  @AutoMap()
  batchId?: number;
  @AutoMap()
  aplicatorId?: number;
  @AutoMap()
  wasFactured?: boolean;
  @AutoMap()
  factureLink?: string;
  @AutoMap()
  id: number;
}
