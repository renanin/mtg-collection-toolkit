export default class Card {
  private id: string;
  private name: string;
  private price: number;
  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
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
}
