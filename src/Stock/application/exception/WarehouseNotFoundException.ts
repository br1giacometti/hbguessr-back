export default class WarehouseNotFoundException extends Error {
  constructor(message = 'StockErrors.WAREHOUSE_NOT_FOUND') {
    super(message);
    this.name = 'WarehouseNotFoundException';
  }
}
