import { AutoMap } from '@automapper/classes';
import CreateWarehouseSchema from 'Stock/infrastructure/schema/CreateWarehouseSchema';
import { z } from 'zod';

export class CreateWarehouseDto {
  @AutoMap()
  description: string;

  constructor(data: z.infer<typeof CreateWarehouseSchema>) {
    Object.assign(this, data);
  }
}
