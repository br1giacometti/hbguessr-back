import { AutoMap } from '@automapper/classes';
import Map from 'Game/domain/models/Map';
import CreateLocationSchema from 'Game/infrastructure/schema/CreateLocationSchema';
import { z } from 'zod';

export class CreateLocationDto {
  @AutoMap()
  mapId: number;
  @AutoMap()
  imageUrl: string;
  @AutoMap()
  coordX: number;
  @AutoMap()
  coordY: number;

  constructor(data: z.infer<typeof CreateLocationSchema>) {
    Object.assign(this, data);
  }
}
