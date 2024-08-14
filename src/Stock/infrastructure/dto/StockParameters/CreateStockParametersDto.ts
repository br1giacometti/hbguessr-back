import { AutoMap } from '@automapper/classes';
import CreateStockParametersSchema from 'Stock/infrastructure/schema/CreateStockParametersSchema';
import { z } from 'zod';

export class CreateStockParametersDto {
  @AutoMap()
  dailySellAmount: number;
  @AutoMap()
  maxSellAmount: number;

  constructor(data: z.infer<typeof CreateStockParametersSchema>) {
    Object.assign(this, data);
  }
}
