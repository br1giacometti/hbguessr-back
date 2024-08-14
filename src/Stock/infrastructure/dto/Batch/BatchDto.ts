import { AutoMap } from '@automapper/classes';

export class BatchDto {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap()
  hectares: number;
  @AutoMap()
  fieldId: number;
}
