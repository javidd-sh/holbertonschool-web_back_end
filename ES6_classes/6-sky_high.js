import Building from './5-building.js';

export default class SkyHighBuilding extends Building {
  constructor(sqft, floors) {
    // Pass sqft up to the parent Building constructor
    super(sqft);
    this._floors = floors;
  }

  // Floors Getter
  get floors() {
    return this._floors;
  }

  // Override the required abstract method
  evacuationWarningMessage() {
    return `Evacuate slowly the ${this._floors} floors`;
  }
}
