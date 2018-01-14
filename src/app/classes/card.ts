export default class Card {
  private id: string;
  private name: string;
  private price: number;
  private quantity: number;
  public printing: string;
  public printings: Card[];
  constructor(id: string = '', name: string = '', price: number = 0, quantity: number = 0) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.printing = '';
    this.printings = [];
  }
  getID() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getPrice() {
    if (isNaN(this.price)) {
      return 0;
    }
    return this.price;
  }
  getQuantity() {
    return this.quantity;
  }
  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
  isCash() {
    return false;
  }
  getAmount() {
    return null;
  }
}
