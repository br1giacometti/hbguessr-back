export default class WarehouseDescriptionAlreadyInUseException extends Error {
  constructor(message = 'StockErrors.WAREHOUSE_DESCRIPTION_ALREADY_IN_USE') {
    super(message);
    this.name = 'WarehouseDescriptionAlreadyInUseException';
  }
}
