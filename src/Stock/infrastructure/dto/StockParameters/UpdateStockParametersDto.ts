import { AutoMap } from '@automapper/classes';
import UpdateStockParametersSchema from 'Stock/infrastructure/schema/UpdateStockParametersSchema';
import { z } from 'zod';

export class UpdateStockParametersDto {
  @AutoMap()
  id: number;
  @AutoMap()
  dailySellAmount: number;
  @AutoMap()
  maxSellAmount: number;

  constructor(data: z.infer<typeof UpdateStockParametersSchema>) {
    Object.assign(this, data);
  }
}
