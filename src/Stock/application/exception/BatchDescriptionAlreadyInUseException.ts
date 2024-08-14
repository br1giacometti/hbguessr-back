export default class BatchDescriptionAlreadyInUseException extends Error {
  constructor(message = 'StockErrors.BATCH_DESCRIPTION_ALREADY_IN_USE') {
    super(message);
    this.name = 'BatchDescriptionAlreadyInUseException';
  }
}
