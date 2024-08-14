import { AutoMap } from '@automapper/classes';

export class CreateAplicatorDto {
  @AutoMap()
  description: string;
}
