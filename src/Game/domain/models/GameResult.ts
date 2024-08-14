import { AutoMap } from '@automapper/classes';

export default class GameResult {
  @AutoMap()
  id?: number;
  @AutoMap()
  gameId: number;
  @AutoMap()
  locationId: number;
  @AutoMap()
  selectedX: number;
  @AutoMap()
  selectedY: number;
  @AutoMap()
  mapId: number;
  @AutoMap()
  score: number;
  @AutoMap()
  createdAt?: Date;

  constructor(
    gameId: number,
    locationId: number,
    selectedX: number,
    selectedY: number,
    mapId: number,
    createdAt?: Date,
    id?: number,
  ) {
    this.id = id;
    this.mapId = mapId;
    this.createdAt = createdAt;
    this.selectedY = selectedY;
    this.selectedX = selectedX;
    this.locationId = locationId;
    this.gameId = gameId;
  }
}
