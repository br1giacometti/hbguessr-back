export default class MapNotFoundException extends Error {
  constructor(message = 'MapNotFoundException') {
    super(message);
    this.name = 'MapNotFoundException';
  }
}
