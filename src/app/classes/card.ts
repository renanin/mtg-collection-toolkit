/**
 * @class Card
 * @classdesc Represents a card
 */
export default class Card {
  /**
   * The multiverse ID of the card
   * @name Card#id
   * @type {string}
   */
  id: string;

  /**
   * The quantity of the card
   * @name Card#quantity
   * @type {number}
   */
  quantity: number;

  /**
   * The latest market price of the card
   * @name Card#marketPrice
   * @type {number}
   */
  marketPrice: number;

  /**
   * @constructs
   * @prop {string} id The ID of the card
   * @prop {number} quantity The quantity of the card
   * @prop {Condition} condition The condition of the card
   * @prop {number} marketPrice The base market price of the card
   */
  constructor(id: string, quantity: number, marketPrice: number) {
    this.id = id;
    this.quantity = quantity;
    this.marketPrice = marketPrice;
  }
}
