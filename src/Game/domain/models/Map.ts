import { AutoMap } from '@automapper/classes';
import Location from './Location';

export default class Map {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  imageUrl: string;
  @AutoMap(() => Location)
  locations?: Location[];

  constructor(
    name: string,
    imageUrl: string,
    locations?: Location[],
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.locations = locations;
  }
}
