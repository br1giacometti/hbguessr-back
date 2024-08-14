export default class StockParametersDescriptionAlreadyInUseException extends Error {
  constructor(
    message = 'StockErrors.StockParameters_DESCRIPTION_ALREADY_IN_USE',
  ) {
    super(message);
    this.name = 'StockParametersDescriptionAlreadyInUseException';
  }
}
