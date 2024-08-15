import { AutoMap } from '@automapper/classes';
import Location from 'Game/domain/models/Location';

export class UpdateMapDto {
  @AutoMap()
  description: string;

  @AutoMap(() => Location)
  locations?: Location[];

  @AutoMap()
  ubication?: number;
}
