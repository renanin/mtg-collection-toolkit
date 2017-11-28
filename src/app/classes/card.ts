export default class Card {
  private name: string;
  private price: number;
  private quantity: number;
  constructor(name: string, price: string, quantity: number) {
    this.name = name;
    this.price = Number(price);
    this.quantity = quantity;
  }
  getQuantity(): number {
    return this.quantity;
  }
  increment() {
    this.quantity += 1;
  }
  decrement() {
    this.quantity -= 1;
  }
}
