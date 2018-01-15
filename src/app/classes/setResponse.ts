/**
 * @class SetResponse
 * @classdesc Represents a set response from the Scryfall API
 */
export default interface SetResponse {
  /**
   * The set code
   * @name SetResponse#code
   * @type {string}
   */
  code: string;
  /**
   * The full name of the set
   * @name SetResponse#name
   * @type {string}
   */
  name: string;
  /**
   * The number of cards in the set
   * @name SetResponse#card_count
   * @type {number}
   */
  card_count: number;
  /**
   * Whether or not the set is digital-only
   * @name SetResponse#digital
   * @type {boolean}
   */
  digital: boolean;
}
