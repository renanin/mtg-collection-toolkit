export default class Set {
  private name: string;
  private code: string;
  private iconURI: string;
  private cardCount: number;
  constructor(name: string, code: string, iconURI: string, cardCount: number) {
    this.name = name;
    this.code = code;
    this.iconURI = iconURI;
    this.cardCount = cardCount;
  }
}
