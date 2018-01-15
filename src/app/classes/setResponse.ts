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
  /**
   * The code of the block the set belongs to
   * @name SetResponse#block_code
   * @type {string}
   */
  block_code: string;
  /**
   * The full name of the block the set belongs to
   * @name SetResponse#block
   * @type {string}
   */
  block: string;
}
