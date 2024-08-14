import { Injectable } from '@nestjs/common';

import LocationNotFoundException from '../exception/LocationNotFoundException';
import Location from 'Game/domain/models/Location';

@Injectable()
export default class LocationValidations {
  validateExistingLocation(Location: Location): boolean {
    if (Location === null) {
      throw new LocationNotFoundException();
    }
    return true;
  }
  validateLocationId(LocationId: number): boolean {
    if (LocationId === null) {
      throw new LocationNotFoundException();
    }
    return true;
  }
}
