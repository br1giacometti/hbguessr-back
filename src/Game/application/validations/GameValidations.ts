import { Injectable } from '@nestjs/common';

import GameNotFoundException from '../exception/GameNotFoundException';
import Game from 'Game/domain/models/Game';

@Injectable()
export default class GameValidations {
  validateExistingGame(Game: Game): boolean {
    if (Game === null) {
      throw new GameNotFoundException();
    }
    return true;
  }
  validateGameId(GameId: number): boolean {
    if (GameId === null) {
      throw new GameNotFoundException();
    }
    return true;
  }
}
