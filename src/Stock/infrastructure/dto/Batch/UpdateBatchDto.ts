import { AutoMap } from '@automapper/classes';
import UpdateBatchSchema from 'Stock/infrastructure/schema/UpdateBatchSchema';
import { z } from 'zod';

export class UpdateBatchDto {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap()
  fieldId: number;

  constructor(data: z.infer<typeof UpdateBatchSchema>) {
    Object.assign(this, data);
  }
}
