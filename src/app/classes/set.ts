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
   * The code of the block the set belongs to
   * @name Set#block
   * @type {string}
   * @private
   */
  private block: string;
  /**
   * The full name of the block the set belongs to
   * @name Set#blockName
   * @type {string}
   * @private
   */
  private blockName: string;
  /**
   * @constructs
   * @param {string} code The code of the set
   * @param {string} name The full name of the set
   * @param {number} cardCount The number of cards in the set
   * @param {string} block The block the set belongs to
   * @param {string} blockName The full name of the block the set belongs to
   */
  constructor(code: string, name: string, cardCount: number, block: string, blockName: string) {
    this.code = code;
    this.name = name;
    this.cardCount = cardCount;
    this.block = block;
    this.blockName = blockName;
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
  getBlock() {
    return this.block;
  }
  getBlockName() {
    return this.blockName;
  }

  /**
   * Returns whether the set is part of a block or not
   * @return {boolean} Whether the set is a part of a block
   */
  inBlock(): boolean {
    return !(this.block === null);
  }
}
