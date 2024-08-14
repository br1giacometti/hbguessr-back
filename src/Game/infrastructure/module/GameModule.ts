import { Module } from '@nestjs/common';

import MapRepository from 'Game/application/repository/MapRepository';
import MapValidations from 'Game/application/validations/MapValidations';
import { HttpModule } from '@nestjs/axios';
import MapController from '../controller/MapController';
import MapService from 'Game/application/service/MapService';
import { MapMapperProfile } from '../autoMapper/MapMapperProfile';
import MapDataProvider from '../dataProvider/MapDataProvider';
import LocationController from '../controller/LocationController';
import LocationService from 'Game/application/service/LocationService';
import LocationRepository from 'Game/application/repository/LocationRepository';
import { LocationMapperProfile } from '../autoMapper/LocationMapperProfile';
import LocationValidations from 'Game/application/validations/LocationValidations';
import LocationDataProvider from '../dataProvider/LocationDataProvider';
import GameResultController from '../controller/GameResultController';
import GameController from '../controller/GameController';
import GameResultService from 'Game/application/service/GameResultService';
import GameResultRepository from 'Game/application/repository/GameResultRepository';
import GameResultDataProvider from '../dataProvider/GameResultDataProvider';
import GameRepository from 'Game/application/repository/GameRepository';
import GameDataProvider from '../dataProvider/GameDataProvider';
import GameService from 'Game/application/service/GameService';
import { GameMapperProfile } from '../autoMapper/GameMapperProfile';
import GameValidations from 'Game/application/validations/GameValidations';
import { GameResultMapperProfile } from '../autoMapper/GameResultMapperProfile';
import GameResultValidations from 'Game/application/validations/GameResultValidations';

@Module({
  controllers: [
    MapController,
    LocationController,
    GameResultController,
    GameController,
  ],
  imports: [HttpModule],
  providers: [
    MapService,
    {
      provide: MapRepository,
      useClass: MapDataProvider,
    },
    LocationService,
    {
      provide: LocationRepository,
      useClass: LocationDataProvider,
    },
    GameResultService,
    {
      provide: GameResultRepository,
      useClass: GameResultDataProvider,
    },
    GameService,
    {
      provide: GameRepository,
      useClass: GameDataProvider,
    },
    LocationMapperProfile,
    LocationValidations,
    GameMapperProfile,
    GameValidations,
    GameResultMapperProfile,
    GameResultValidations,
    MapMapperProfile,
    MapValidations,
  ],
})
export default class GameModule {}
