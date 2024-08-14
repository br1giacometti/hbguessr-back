import { AutoMap } from '@automapper/classes';
import { GameResult as IGameResultEntity } from '@prisma/client';

class GameResultEntity implements IGameResultEntity {
  @AutoMap()
  id: number;
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
  createdAt: Date;
}

export default GameResultEntity;
