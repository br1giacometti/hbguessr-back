import { AutoMap } from '@automapper/classes';

export class AplicatorDto {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
}
