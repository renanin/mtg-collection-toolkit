/**
 * @class Set
 * @classdesc A full set
 */
export default class Set {
  /**
   * The set code
   * @name Set#code
   * @type {string}
   * @private
   */
  private code: string;
  /**
   * The full name of the set
   * @name Set#name
   * @type {string}
   * @private
   */
  private name: string;
  /**
   * The number of cards in the set
   * @name Set#cardCount
   * @type {number}
   * @private
   */
  private cardCount: number;
  /**
   * @constructs
   * @param {string} code The code of the set
   * @param {string} name The full name of the set
   * @param {number} cardCount The number of cards in the set
   */
  constructor(code: string, name: string, cardCount: number) {
    this.code = code;
    this.name = name;
    this.cardCount = cardCount;
  }
}
