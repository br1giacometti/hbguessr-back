import { AutoMap } from '@automapper/classes';

import User from 'Authentication/domain/models/User';
import GameResult from './GameResult';

export default class Game {
  @AutoMap()
  id?: number;
  @AutoMap()
  userId: string;
  @AutoMap()
  totalScore: number;
  @AutoMap()
  createdAt: Date;
  @AutoMap(() => GameResult)
  gameResults?: GameResult[];
  @AutoMap()
  user?: User;

  constructor(
    createdAt: Date,
    userId: string,
    totalScore: number,
    user?: User,
    gameResults?: GameResult[],
    id?: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.gameResults = gameResults;
    this.createdAt = createdAt;
    this.user = user;
    this.totalScore = totalScore;
  }
}
