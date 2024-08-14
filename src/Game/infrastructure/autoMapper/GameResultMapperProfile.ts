import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import GameResultEntity from '../entity/GameResultEntity';
import { GameResultDto } from '../dto/GameResult/GameResultDto';
import { CreateGameResultDto } from '../dto/GameResult/CreateGameResultDto';
import { UpdateGameResultDto } from '../dto/GameResult/UpdateGameResultDto';
import GameResult from 'Game/domain/models/GameResult';

@Injectable()
export class GameResultMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, GameResultEntity, GameResult);
      createMap(mapper, GameResult, GameResultDto);
      createMap(mapper, GameResultDto, GameResult);
      createMap(mapper, CreateGameResultDto, GameResult);
      createMap(mapper, UpdateGameResultDto, GameResult);
    };
  }
}
