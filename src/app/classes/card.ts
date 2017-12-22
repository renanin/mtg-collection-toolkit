export default class Card {
  private id: string;
  private name: string;
  private price: number;
  private quantity: number;
  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = 0;
  }
  getID() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  getQuantity() {
    return this.quantity;
  }
}
