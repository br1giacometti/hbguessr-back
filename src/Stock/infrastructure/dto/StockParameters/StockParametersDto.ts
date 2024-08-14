import { AutoMap } from '@automapper/classes';

export class StockParametersDto {
  @AutoMap()
  id: number;
  @AutoMap()
  dailySellAmount: number;
  @AutoMap()
  maxSellAmount: number;
}
