import { AutoMap } from '@automapper/classes';
import { Location as ILocationEntity } from '@prisma/client';

class LocationEntity implements ILocationEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  mapId: number;
  @AutoMap()
  imageUrl: string;
  @AutoMap()
  coordX: number;
  @AutoMap()
  coordY: number;
}

export default LocationEntity;
