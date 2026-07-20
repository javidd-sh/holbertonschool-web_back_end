export default class Airport {
  constructor(name, code) {
    this._name = name;
    this._code = code;
  }

  // Overrides the string tag description [object X]
  get [Symbol.toStringTag]() {
    return this._code;
  }
}
