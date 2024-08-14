export default class GameNotFoundException extends Error {
  constructor(message = 'GameNotFoundException') {
    super(message);
    this.name = 'GameNotFoundException';
  }
}
