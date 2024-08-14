import { Injectable } from '@nestjs/common';

import MapNotFoundException from '../exception/MapNotFoundException';
import Map from 'Game/domain/models/Map';

@Injectable()
export default class MapValidations {
  validateExistingMap(Map: Map): boolean {
    if (Map === null) {
      throw new MapNotFoundException();
    }
    return true;
  }
  validateMapId(MapId: number): boolean {
    if (MapId === null) {
      throw new MapNotFoundException();
    }
    return true;
  }
}
