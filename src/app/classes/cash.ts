import Card from './card';

export default class Cash extends Card {
  private amount: number;
  constructor(amount: number = 0) {
    super();
    this.amount = amount;
  }
  getAmount() {
    return Number(this.amount);
  }
  isCash() {
    return true;
  }
}
