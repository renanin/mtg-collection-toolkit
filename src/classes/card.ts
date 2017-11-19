export default class Card {
  private name: string;
  private set: string;
  private setName: string;
  private id: number;
  private quantity: number;
  private foilQuantity: number;
  constructor(
    name: string = '',
    set: string = '',
    setName: string = '',
    id: number = -1,
    quantity: number = 0,
    foilQuantity: number = 0) {
    this.name = name;
    this.set = set;
    this.setName = setName;
    this.id = id;
    this.quantity = quantity;
    this.foilQuantity = foilQuantity;
  }
  getName(): string {
    return this.name;
  }
  getSet(): string {
    return this.set;
  }
  getSetName(): string {
    return this.setName;
  }
  getId(): number {
    return this.id;
  }
  getQuantity(): number {
    return this.quantity;
  }
  getFoilQuantity(): number {
    return this.foilQuantity;
  }
  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
  setFoilQuantity(quantity: number) {
    this.foilQuantity = quantity;
  }
}
