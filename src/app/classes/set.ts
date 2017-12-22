import Card from './card';

export default class Set {
  private code: string;
  private name: string;
  private cardCount: number;
  private cards: Card[];
  constructor(code: string, name: string, cardCount: number) {
    this.code = code;
    this.name = name;
    this.cardCount = cardCount;
    this.cards = [];
  }
  getCode() {
    return this.code;
  }
  getName() {
    return this.name;
  }
  getCardCount() {
    return this.cardCount;
  }
  getCards() {
    return this.cards;
  }
  addCard(card: Card) {
    this.cards.push(card);
  }
}
