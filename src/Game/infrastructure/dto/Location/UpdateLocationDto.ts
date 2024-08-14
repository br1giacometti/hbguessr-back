import { AutoMap } from '@automapper/classes';

import UpdateLocationSchema from 'Game/infrastructure/schema/UpdateLocationSchema';
import { z } from 'zod';

export class UpdateLocationDto {
  @AutoMap()
  id: number;
  @AutoMap()
  mapId: number;
  @AutoMap()
  imageUrl: string;

  constructor(data: z.infer<typeof UpdateLocationSchema>) {
    Object.assign(this, data);
  }
}
