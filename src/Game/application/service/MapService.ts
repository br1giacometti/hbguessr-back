import { Injectable } from '@nestjs/common';

import MapValidations from '../validations/MapValidations';
import Map from 'Game/domain/models/Map';
import MapRepository from '../repository/MapRepository';

@Injectable()
export default class MapService {
  constructor(
    private readonly repository: MapRepository,
    private readonly validator: MapValidations,
  ) {}

  async createMap(map: Map): Promise<Map> {
    const mapCreated = await this.repository.insert({
      name: map.name,
      id: map.id,
      sizeX: map.sizeX,
      sizeY: map.sizeY,
      imageUrl: map.imageUrl,
    });
    return mapCreated;
  }

  async updateMap(id: number, map: Map): Promise<Map> {
    const mapCreated = await this.repository.update(id, {
      imageUrl: map.imageUrl,
      name: map.name,
    });
    return mapCreated;
  }

  async deleteMap(mapId: number): Promise<Map> {
    return await this.repository.delete(mapId);
  }

  async findMapById(mapId: number): Promise<Map> {
    this.validator.validateMapId(mapId);
    const map = await this.repository.findById(mapId);
    this.validator.validateExistingMap(map);
    return map;
  }

  async fetchAllmaps(): Promise<Map[]> {
    const map = await this.repository.findAll();
    return map;
  }
}
