import { AutoMap } from '@automapper/classes';
import Batch from 'Stock/domain/models/Batch';

export class FieldDto {
  @AutoMap()
  id: number;

  @AutoMap()
  description: string;

  @AutoMap()
  hectares: number;

  @AutoMap(() => Batch)
  batches?: Batch[];
}
