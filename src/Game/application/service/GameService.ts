import { Injectable } from '@nestjs/common';

import GameValidations from '../validations/GameValidations';

import GameRepository from '../repository/GameRepository';
import Game from 'Game/domain/models/Game';

@Injectable()
export default class GameService {
  constructor(
    private readonly repository: GameRepository,
    private readonly validator: GameValidations,
  ) {}

  async createGame(game: Game): Promise<Game> {
    console.log('game seriver', game);
    const gameCreated = await this.repository.insert({
      createdAt: new Date(),
      totalScore: 0,
      userId: game.userId,
      gameResults: game.gameResults,
    });
    return gameCreated;
  }

  async updateGame(id: number, game: Game): Promise<Game> {
    const gameCreated = await this.repository.update(id, {
      gameResults: game.gameResults,
    });
    return gameCreated;
  }

  async deleteGame(gameId: number): Promise<Game> {
    return await this.repository.delete(gameId);
  }

  async findGameById(gameId: number): Promise<Game> {
    this.validator.validateGameId(gameId);
    const game = await this.repository.findById(gameId);
    this.validator.validateExistingGame(game);
    return game;
  }

  async fetchAllgames(): Promise<Game[]> {
    const game = await this.repository.findAll();
    return game;
  }
}
