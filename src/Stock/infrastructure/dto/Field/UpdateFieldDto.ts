import { AutoMap } from '@automapper/classes';
import Batch from 'Stock/domain/models/Batch';

export class UpdateFieldDto {
  @AutoMap()
  description: string;

  @AutoMap()
  hectares: number;

  @AutoMap(() => Batch)
  batches?: Batch[];
}
