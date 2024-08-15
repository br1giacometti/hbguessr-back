import { AutoMap } from '@automapper/classes';
import Map from './Map';

export default class Location {
  @AutoMap()
  id: number;
  @AutoMap()
  imageUrl: string;
  @AutoMap()
  mapId: number;
  @AutoMap()
  coordX: number;
  @AutoMap()
  coordY: number;

  constructor(
    coordX: number,
    coordY: number,
    mapId: number,
    imageUrl: string,
    id?: number,
  ) {
    this.id = id;
    this.mapId = mapId;
    this.imageUrl = imageUrl;
    this.coordX = coordX;
    this.coordY = coordY;
  }
}
