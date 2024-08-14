import { AutoMap } from '@automapper/classes';

export default class StockParameters {
  @AutoMap()
  id: number;
  @AutoMap()
  maxSellAmount: number;
  @AutoMap()
  dailySellAmount: number;

  constructor(maxSellAmount: number, dailySellAmount: number, id?: number) {
    this.id = id;
    this.maxSellAmount = maxSellAmount;
    this.dailySellAmount = dailySellAmount;
  }
}
