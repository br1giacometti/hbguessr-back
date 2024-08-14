import { AutoMap } from '@automapper/classes';

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
