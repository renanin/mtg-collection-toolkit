export default class Set {
  private name: string;
  private code: string;
  private iconURI: string;
  constructor(name: string, code: string, iconURI: string) {
    this.name = name;
    this.code = code;
    this.iconURI = iconURI;
  }
}
