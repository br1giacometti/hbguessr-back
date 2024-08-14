export default class GameResultDescriptionAlreadyInUseException extends Error {
  constructor(message = 'StockErrors.GameResult_DESCRIPTION_ALREADY_IN_USE') {
    super(message);
    this.name = 'GameResultDescriptionAlreadyInUseException';
  }
}
