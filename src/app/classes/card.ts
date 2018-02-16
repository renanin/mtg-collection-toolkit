import Printing from './printing';

/**
 * @class Card
 * @classdesc Represents a card
 */
export default class Card {
  /**
   * The name of the card
   * @name Card#name
   * @type {string}
   */
  name: string;

  /**
   * The set of the card
   * @name Card#set
   * @type {Printing}
   */
  set: Printing;

  /**
   * The current price in USD
   * @name Card#price
   * @type {number}
   */
  price: number;

  /**
   * @constructs
   * @param {string} name The name of the card
   * @param {Printing} set The printing of the card
   */
  constructor(name: string, set: Printing, price: number) {
    this.name = name;
    this.set = set;
    this.price = price;
  }
}
