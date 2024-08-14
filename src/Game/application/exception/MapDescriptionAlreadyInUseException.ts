export default class LocationDescriptionAlreadyInUseException extends Error {
  constructor(message = 'StockErrors.Location_DESCRIPTION_ALREADY_IN_USE') {
    super(message);
    this.name = 'LocationDescriptionAlreadyInUseException';
  }
}
