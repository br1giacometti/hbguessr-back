import { AutoMap } from '@automapper/classes';
import Location from 'Game/domain/models/Location';

export class UpdateMapDto {
  @AutoMap()
  description: string;

  @AutoMap()
  hectares: number;

  @AutoMap(() => Location)
  locations?: Location[];
}
