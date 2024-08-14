import { AutoMap } from '@automapper/classes';
import Batch from './Batch';

export default class Field {
  @AutoMap()
  id: number;
  @AutoMap()
  description: string;
  @AutoMap()
  hectares: number;
  @AutoMap(() => Batch)
  batches?: Batch[];

  constructor(
    description: string,
    hectares: number,
    batches?: Batch[],
    id?: number,
  ) {
    this.id = id;
    this.hectares = hectares;
    this.description = description;
    this.batches = batches;
  }
}
