export default class WarehouseDetailNotFoundException extends Error {
  constructor(message = 'StockErrors.WAREHOUSEDETAIl_NOT_FOUND') {
    super(message);
    this.name = 'WarehouseDetailNotFoundException';
  }
}
