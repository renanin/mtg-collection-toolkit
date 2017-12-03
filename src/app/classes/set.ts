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
  getName(): string {
    return this.name;
  }
  getCode(): string {
    return this.code;
  }
  getIconURI(): string {
    return this.iconURI;
  }
  getCardCount(): number {
    return this.cardCount;
  }
  getCards(): Card[] {
    const cards = this.cards;
    const output = [];
    for (let i = 0; i < cards.length; i += 1) {
      let a = 0;
      for (; a < output.length; a += 1) {
        if (cards[i].getName() < output[a].getName()) {
          break;
        }
      }
      output.splice(a, 0, cards[i]);
    }
    return output;
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
  totalPrice(): number {
    let sum = 0;
    this.cards.forEach((card) => {
      sum += (card.getPrice() * card.getQuantity());
    });
    return sum;
  }
}
