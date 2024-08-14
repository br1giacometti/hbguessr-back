import { AutoMap } from '@automapper/classes';
import CreateBatchSchema from 'Stock/infrastructure/schema/CreateBatchSchema';
import { z } from 'zod';

export class CreateBatchDto {
  @AutoMap()
  description: string;
  @AutoMap()
  hectares: number;
  @AutoMap()
  fieldId: number;

  constructor(data: z.infer<typeof CreateBatchSchema>) {
    Object.assign(this, data);
  }
}
