import { AutoMap } from '@automapper/classes';
import { Map as IMapEntity } from '@prisma/client';
import LocationEntity from './LocationEntity';

class MapEntity implements IMapEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  imageUrl: string;
  @AutoMap()
  sizeX: number;
  @AutoMap()
  sizeY: number;
  @AutoMap(() => LocationEntity)
  locations?: LocationEntity[];
}

export default MapEntity;
