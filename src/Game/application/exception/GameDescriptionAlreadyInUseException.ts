export default class GameDescriptionAlreadyInUseException extends Error {
  constructor(message = 'StockErrors.Game_DESCRIPTION_ALREADY_IN_USE') {
    super(message);
    this.name = 'GameDescriptionAlreadyInUseException';
  }
}
