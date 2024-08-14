import { AutoMap } from '@automapper/classes';
import { StockParameters as IStockParametersEntity } from '@prisma/client';

class StockParametersEntity implements IStockParametersEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  dailySellAmount: number;
  @AutoMap()
  maxSellAmount: number;
}

export default StockParametersEntity;
