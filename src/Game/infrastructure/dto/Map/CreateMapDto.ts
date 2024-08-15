import { AutoMap } from '@automapper/classes';
import Location from 'Game/domain/models/Location';
import CreateBatchSchema from 'Stock/infrastructure/schema/CreateBatchSchema';
import { z } from 'zod';

export class CreateMapDto {
  @AutoMap()
  name: string;

  @AutoMap()
  imageUrl: string;

  @AutoMap()
  sizeX: number;

  @AutoMap()
  sizeY: number;

  @AutoMap()
  ubication?: number;

  @AutoMap(() => Location)
  locations?: Location[];

  constructor(data: z.infer<typeof CreateBatchSchema>) {
    Object.assign(this, data);
  }
}
