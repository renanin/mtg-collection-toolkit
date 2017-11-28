import Card from './card';

export default class Set {
  private name: string;
  private code: string;
  private iconURI: string;
  private cardCount: number;
  private cards: Card[];
  constructor(name: string = '', code: string = '', iconURI: string = '', cardCount: number = -1) {
    this.name = name;
    this.code = code;
    this.iconURI = iconURI;
    this.cardCount = cardCount;
    this.cards = [];
  }
  getCode(): string {
    return this.code;
  }
}
