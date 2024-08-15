import { AutoMap } from '@automapper/classes';
import User from 'Authentication/domain/models/User';
import GameResult from 'Game/domain/models/GameResult';

import UpdateGameSchema from 'Game/infrastructure/schema/UpdateGameSchema';
import { z } from 'zod';

export class UpdateGameDto {
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

  constructor(data: z.infer<typeof UpdateGameSchema>) {
    Object.assign(this, data);
  }
}
