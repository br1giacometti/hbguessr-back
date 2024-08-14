import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { CreateGameDto } from '../dto/Game/CreateGameDto';
import GameEntity from '../entity/GameEntity';
import { UpdateGameDto } from '../dto/Game/UpdateGameDto';
import Game from 'Game/domain/models/Game';
import { GameDto } from '../dto/Game/GameDto';

@Injectable()
export class GameMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, GameEntity, Game);
      createMap(mapper, Game, GameDto);
      createMap(mapper, GameDto, Game);
      createMap(mapper, CreateGameDto, Game);
      createMap(mapper, UpdateGameDto, Game);
    };
  }
}
