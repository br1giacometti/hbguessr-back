import { AutoMap } from '@automapper/classes';
import UpdateGameResultSchema from 'Game/infrastructure/schema/UpdateGameResultSchema';

import { z } from 'zod';

export class UpdateGameResultDto {
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

  constructor(data: z.infer<typeof UpdateGameResultSchema>) {
    Object.assign(this, data);
  }
}
