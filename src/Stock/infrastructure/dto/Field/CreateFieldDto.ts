import { AutoMap } from '@automapper/classes';
import Batch from 'Stock/domain/models/Batch';
import CreateBatchSchema from 'Stock/infrastructure/schema/CreateBatchSchema';
import { z } from 'zod';

export class CreateFieldDto {
  @AutoMap()
  description: string;

  @AutoMap()
  hectares: number;

  @AutoMap(() => Batch)
  batches?: Batch[];

  constructor(data: z.infer<typeof CreateBatchSchema>) {
    Object.assign(this, data);
  }
}
