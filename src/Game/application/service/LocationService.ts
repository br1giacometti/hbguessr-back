import { Injectable } from '@nestjs/common';

import LocationValidations from '../validations/LocationValidations';

import LocationRepository from '../repository/LocationRepository';
import Location from 'Game/domain/models/Location';

@Injectable()
export default class LocationService {
  constructor(
    private readonly repository: LocationRepository,
    private readonly validator: LocationValidations,
  ) {}

  async createLocation(location: Location): Promise<Location> {
    const locationCreated = await this.repository.insert({
      mapId: location.mapId,
      id: location.id,
      imageUrl: location.imageUrl,
      coordX: location.coordX,
      coordY: location.coordY,
    });
    return locationCreated;
  }

  async updateLocation(id: number, location: Location): Promise<Location> {
    const locationCreated = await this.repository.update(id, {
      imageUrl: location.imageUrl,
    });
    return locationCreated;
  }

  async deleteLocation(locationId: number): Promise<Location> {
    return await this.repository.delete(locationId);
  }

  async findLocationById(locationId: number): Promise<Location> {
    this.validator.validateLocationId(locationId);
    const location = await this.repository.findById(locationId);
    this.validator.validateExistingLocation(location);
    return location;
  }

  async fetchAlllocations(): Promise<Location[]> {
    const location = await this.repository.findAll();
    return location;
  }
}
