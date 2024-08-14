import { AutoMap } from '@automapper/classes';
import { Game as IGameEntity } from '@prisma/client';
import GameResultEntity from './GameResultEntity';
import User from 'Authentication/domain/models/User';

class GameEntity implements IGameEntity {
  @AutoMap()
  id: number;
  @AutoMap()
  userId: string;
  @AutoMap(() => GameResultEntity)
  gameResults: GameResultEntity[];
  @AutoMap()
  totalScore: number;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  user?: User;
}

export default GameEntity;
