import { AutoMap } from '@automapper/classes';
import { Field as IFieldEntity } from '@prisma/client';
import BatchEntity from './BatchEntity';

class FieldEntity implements IFieldEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap()
  hectares: number;
  @AutoMap(() => BatchEntity)
  batches: BatchEntity[];
}

export default FieldEntity;
