import { AutoMap } from '@automapper/classes';

export class GameResultDto {
  @AutoMap()
  id?: number;
  @AutoMap()
  gameId: number;
  @AutoMap()
  locationId: number;
  @AutoMap()
  selectedX: number;
  @AutoMap()
  selectedY: number;
  @AutoMap()
  mapId: number;
  @AutoMap()
  score: number;
  @AutoMap()
  createdAt?: Date;
}
