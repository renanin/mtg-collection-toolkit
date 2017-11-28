export default class Card {
  private name: string;
  private price: number;
  private quantity: number;
  constructor(name: string, price: string) {
    this.name = name;
    this.price = Number(price);
    this.quantity = 0;
  }
  increment() {
    this.quantity += 1;
  }
  decrement() {
    this.quantity -= 1;
  }
}
