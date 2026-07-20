export default class Currency {
  constructor(code, name) {
    this._code = code;
    this._name = name;
  }

  // Code Getter and Setter
  get code() {
    return this._code;
  }

  set code(value) {
    this._code = value;
  }

  // Name Getter and Setter
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  // Method to display full currency detail
  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}
