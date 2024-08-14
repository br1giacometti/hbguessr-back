export default class LocationNotFoundException extends Error {
  constructor(message = 'LocationNotFoundException') {
    super(message);
    this.name = 'LocationNotFoundException';
  }
}
