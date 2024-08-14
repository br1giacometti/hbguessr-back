import { Injectable } from '@nestjs/common';

import GameResultNotFoundException from '../exception/GameResultNotFoundException';
import GameResult from 'Game/domain/models/GameResult';

@Injectable()
export default class GameResultValidations {
  validateExistingGameResult(GameResult: GameResult): boolean {
    if (GameResult === null) {
      throw new GameResultNotFoundException();
    }
    return true;
  }
  validateGameResultId(GameResultId: number): boolean {
    if (GameResultId === null) {
      throw new GameResultNotFoundException();
    }
    return true;
  }
}
