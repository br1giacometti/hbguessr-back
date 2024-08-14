import { AutoMap } from '@automapper/classes';
import UpdateWarehouseSchema from 'Stock/infrastructure/schema/UpdateWarehouseSchema';
import { z } from 'zod';

export class UpdateWarehouseDto {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;

  constructor(data: z.infer<typeof UpdateWarehouseSchema>) {
    Object.assign(this, data);
  }
}
