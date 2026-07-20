const cloneSymbol = Symbol('cloneCar');

export default class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  // Internal helper method using a Symbol key
  [cloneSymbol]() {
    return new this.constructor();
  }

  // Public method that triggers the cloning logic
  cloneCar() {
    return this[cloneSymbol]();
  }
}
