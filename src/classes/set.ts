import Card from './card';

export default class Set {
  private code: string;
  private name: string;
  private cards: Card[];
  constructor(code: string = '', name: string = '') {
    this.name = name;
    this.code = code;
    this.cards = [];
  }
  addCard(card: Card) {
    this.cards.push(card);
  }
  cardCount(): number {
    let count = 0;
    this.cards.forEach((card) => {
      count += Number(card.getQuantity());
      count += Number(card.getFoilQuantity());
    });
    return count;
  }
  findCard(name: string): Card {
    for (let i = 0; i < this.cards.length; i += 1) {
      if (this.cards[i].getName() === name) {
        return this.cards[i];
      }
    }
    return new Card();
  }
  getCode(): string {
    return this.code;
  }
  getName(): string {
    return this.name;
  }
  getCards(): Card[] {
    return this.cards;
  }
  getCard(index: number): Card {
    return this.cards[index];
  }
  setQuantity(index: number, quantity: number) {
    this.cards[index].setQuantity(quantity);
  }
  setFoilQuantity(index: number, quantity: number) {
    this.cards[index].setFoilQuantity(quantity);
  }
}
