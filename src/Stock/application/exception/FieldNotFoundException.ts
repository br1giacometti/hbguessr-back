export default class FieldNotFoundException extends Error {
  constructor(message = 'StockErrors.FIELD_NOT_FOUND') {
    super(message);
    this.name = 'FieldNotFoundException';
  }
}
