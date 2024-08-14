import { AutoMap } from '@automapper/classes';
import { Batch as IBatchEntity } from '@prisma/client';

class BatchEntity implements IBatchEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap()
  hectares: number;
  @AutoMap()
  fieldId: number;
}

export default BatchEntity;
