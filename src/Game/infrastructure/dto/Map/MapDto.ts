import { AutoMap } from '@automapper/classes';
import Location from 'Game/domain/models/Location';

export class MapDto {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  imageUrl: string;
  @AutoMap(() => Location)
  locations?: Location[];
}
