import { AutoMap } from '@automapper/classes';
import User from 'Authentication/domain/models/User';
import GameResult from 'Game/domain/models/GameResult';

export class GameDto {
  @AutoMap()
  id?: number;
  @AutoMap(() => GameResult)
  gameResults?: GameResult[];
  @AutoMap()
  userId: string;
  @AutoMap()
  totalScore: number;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  user?: User;
}
