export default class AplicatorNotFoundException extends Error {
  constructor(message = 'AplicatorNotFoundException') {
    super(message);
    this.name = 'AplicatorNotFoundException';
  }
}
