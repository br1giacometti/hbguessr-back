export default class BatchNotFoundException extends Error {
  constructor(message = 'BatchNotFoundException') {
    super(message);
    this.name = 'BatchNotFoundException';
  }
}
