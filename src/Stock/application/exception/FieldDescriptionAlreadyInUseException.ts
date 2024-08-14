export default class FieldDescriptionAlreadyInUseException extends Error {
  constructor(message = 'StockErrors.FIELD_DESCRIPTION_ALREADY_IN_USE') {
    super(message);
    this.name = 'FieldDescriptionAlreadyInUseException';
  }
}
