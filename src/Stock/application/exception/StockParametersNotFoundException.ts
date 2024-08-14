export default class StockParametersNotFoundException extends Error {
  constructor(message = 'StockParametersNotFoundException') {
    super(message);
    this.name = 'StockParametersNotFoundException';
  }
}
