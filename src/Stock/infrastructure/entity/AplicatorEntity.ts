import { AutoMap } from '@automapper/classes';
import { Aplicator as IAplicatorEntity } from '@prisma/client';

class AplicatorEntity implements IAplicatorEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
}

export default AplicatorEntity;
