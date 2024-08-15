import { AutoMap } from '@automapper/classes';
import Location from './Location';

export default class Map {
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
  @AutoMap(() => Location)
  locations?: Location[];

  constructor(
    name: string,
    imageUrl: string,
    sizeX: number,
    sizeY: number,
    locations?: Location[],
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.locations = locations;
  }
}
