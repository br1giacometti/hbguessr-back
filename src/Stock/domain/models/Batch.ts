import { AutoMap } from '@automapper/classes';

export default class Batch {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap()
  hectares: number;
  @AutoMap()
  fieldId: number;

  constructor(
    description: string,
    hectares: number,
    fieldId: number,
    id?: number,
  ) {
    this.id = id;
    this.hectares = hectares;
    this.description = description;
    this.fieldId = fieldId;
  }
}
