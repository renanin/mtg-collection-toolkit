export default class Set {
  private code: string;
  private name: string;
  private cardCount: number;
  constructor(code: string, name: string, cardCount: number) {
    this.code = code;
    this.name = name;
    this.cardCount = cardCount;
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
}
