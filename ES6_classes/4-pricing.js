import Currency from './3-currency.js';

export default class Pricing {
  constructor(amount, currency) {
    this._amount = amount;
    this._currency = currency;
  }

  // Amount Getter and Setter
  get amount() {
    return this._amount;
  }

  set amount(value) {
    this._amount = value;
  }

  // Currency Getter and Setter
  get currency() {
    return this._currency;
  }

  set currency(value) {
    this._currency = value;
  }

  // Normal Instance Method
  displayFullPrice() {
    return `${this._amount} ${this._currency.name} (${this._currency.code})`;
  }

  // Static Class Method
  static convertPrice(amount, conversionRate) {
    return amount * conversionRate;
  }
}
