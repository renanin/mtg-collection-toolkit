export default class Card {
  private name: string;
  private price: number;
  constructor(name: string, price: string) {
    this.name = name;
    this.price = Number(price);
  }
}
