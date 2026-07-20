export default class Building {
  constructor(sqft) {
    // Check if a subclass is instantiating and missing the required method
    if (this.constructor !== Building && typeof this.evacuationWarningMessage !== 'function') {
      throw new Error('Class extending Building must override evacuationWarningMessage');
    }
    this._sqft = sqft;
  }

  // Sqft Getter
  get sqft() {
    return this._sqft;
  }
}
