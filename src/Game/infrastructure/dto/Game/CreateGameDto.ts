import { AutoMap } from '@automapper/classes';
import User from 'Authentication/domain/models/User';
import GameResult from 'Game/domain/models/GameResult';
import CreateGameSchema from 'Game/infrastructure/schema/CreateGameSchema';
import { z } from 'zod';

export class CreateGameDto {
  @AutoMap()
  id: number;
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

  constructor(data: z.infer<typeof CreateGameSchema>) {
    Object.assign(this, data);
  }
}
