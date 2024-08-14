import { Injectable } from '@nestjs/common';

import GameResultValidations from '../validations/GameResultValidations';

import GameResultRepository from '../repository/GameResultRepository';
import GameResult from 'Game/domain/models/GameResult';

@Injectable()
export default class GameResultService {
  constructor(
    private readonly repository: GameResultRepository,
    private readonly validator: GameResultValidations,
  ) {}

  async createGameResult(gameresult: GameResult): Promise<GameResult> {
    const gameresultCreated = await this.repository.insert({
      gameId: gameresult.gameId,
      locationId: gameresult.locationId,
      mapId: gameresult.mapId,
      score: gameresult.score,
      selectedX: gameresult.selectedX,
      selectedY: gameresult.selectedY,
    });
    return gameresultCreated;
  }

  async deleteGameResult(gameresultId: number): Promise<GameResult> {
    return await this.repository.delete(gameresultId);
  }

  async findGameResultById(gameresultId: number): Promise<GameResult> {
    this.validator.validateGameResultId(gameresultId);
    const gameresult = await this.repository.findById(gameresultId);
    this.validator.validateExistingGameResult(gameresult);
    return gameresult;
  }

  async fetchAllgameresults(): Promise<GameResult[]> {
    const gameresult = await this.repository.findAll();
    return gameresult;
  }
}
