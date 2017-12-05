export default class Card {
  private name: string;
  private price: number;
  private quantity: number;
  constructor(name: string, price: string, quantity: number) {
    this.name = name;
    this.price = Number(price);
    this.quantity = Number(quantity);
  }
  getName(): string {
    return this.name;
  }
  getPrice(): number {
    return this.price;
  }
  getQuantity(): number {
    return Number(this.quantity);
  }
  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
  increment() {
    this.quantity += 1;
  }
  decrement() {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
  }
}
