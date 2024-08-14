export default class GameResultNotFoundException extends Error {
  constructor(message = 'GameResultNotFoundException') {
    super(message);
    this.name = 'GameResultNotFoundException';
  }
}
