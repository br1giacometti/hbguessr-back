import { AutoMap } from '@automapper/classes';
import Map from 'Game/domain/models/Map';

export class LocationDto {
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
