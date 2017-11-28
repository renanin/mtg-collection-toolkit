import Card from './card';

export default class Set {
  private name: string;
  private code: string;
  private iconURI: string;
  private cardCount: number;
  private cards: Card[];
  constructor(
    name: string = '',
    code: string = '',
    iconURI: string = '',
    cardCount: number = -1,
    cards: Card[] = []) {
    this.name = name;
    this.code = code;
    this.iconURI = iconURI;
    this.cardCount = cardCount;
    this.cards = cards;
  }
  getCode(): string {
    return this.code;
  }
  getCardCount(): number {
    return this.cardCount;
  }
  totalCount(): number {
    let sum = 0;
    this.cards.forEach((card) => {
      sum += card.getQuantity();
    });
    return sum;
  }
  uniqueCount(): number {
    let sum = 0;
    this.cards.forEach((card) => {
      if (card.getQuantity() > 0) {
        sum += 1;
      }
    });
    return sum;
  }
}
