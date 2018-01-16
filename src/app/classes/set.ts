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
   * The URL of the set icon
   * @name Set#icon
   * @type {string}
   * @private
   */
  private icon: string;
  /**
   * The code of the parent set
   * @name Set#parentCode
   * @type {string}
   * @private
   */
  private parentCode: string;
  /**
   * @constructs
   * @param {string} code The code of the set
   * @param {string} name The full name of the set
   * @param {number} cardCount The number of cards in the set
   * @param {string} block The block the set belongs to
   * @param {string} blockName The full name of the block the set belongs to
   * @param {string} icon The full URL of the set icon
   * @param {string} parentCode The code of the parent set
   */
  constructor(code: string, name: string, cardCount: number, block: string, blockName: string, icon: string, parentCode: string) {
    this.code = code;
    this.name = name;
    this.cardCount = cardCount;
    this.block = block;
    this.blockName = blockName;
    this.icon = icon;
    this.parentCode = parentCode;
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
  getIcon() {
    return this.icon;
  }
  getParentCode() {
    return this.parentCode;
  }

  /**
   * Returns whether the set is part of a block or not
   * @return {boolean} Whether the set is a part of a block
   */
  inBlock(): boolean {
    return typeof this.block === 'string';
  }
  
  /**
   * Returns whether the set has a parent set
   * @return {boolean} Whether the set has a parent
   */
  hasParent(): boolean {
    return typeof this.parentCode === 'string';
  }

  /**
   * Gets the "group" for display, which is either the parent set or block
   * @return {string} The group
   */
  getGroupCode(): string {
    if (this.inBlock()) {
      return this.block;
    } else if (this.hasParent()) {
      return this.parentCode;
    } else {
      return this.code;
    }
  }

  /**
   * Gets the group name
   * @return {string} The name of the group
   */
  getGroupName(): string {
    if (this.inBlock()) {
      return this.blockName;
    } else if (this.hasParent()) {
      return null;
    } else {
      return this.name;
    }
  }
}
