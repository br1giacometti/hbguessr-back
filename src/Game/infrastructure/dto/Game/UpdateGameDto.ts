import { AutoMap } from '@automapper/classes';
import GameResult from 'Game/domain/models/GameResult';

import UpdateGameSchema from 'Game/infrastructure/schema/UpdateGameSchema';
import { z } from 'zod';

export class UpdateGameDto {
  @AutoMap()
  id: number;
  @AutoMap(() => GameResult)
  gameResults?: GameResult[];

  constructor(data: z.infer<typeof UpdateGameSchema>) {
    Object.assign(this, data);
  }
}
