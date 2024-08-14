import { AutoMap } from '@automapper/classes';
import CreateGameResultSchema from 'Game/infrastructure/schema/CreateGameResultSchema';

import { z } from 'zod';

export class CreateGameResultDto {
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

  constructor(data: z.infer<typeof CreateGameResultSchema>) {
    Object.assign(this, data);
  }
}
