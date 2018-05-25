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
   * The set code the card was printed in
   * @name Card#set
   * @type {string}
   */
  set: string;

  /**
   * The user's price for the card
   * @name Card#price
   * @type {number}
   */
  price: number;

  /**
   * The condition of the card
   * @name Card#condition
   * @type {string}
   */
  condition: string;

  /**
   * Whether the card is foil or not
   * @name Card#foil
   * @type {boolean}
   */
  foil: boolean;

  /**
   * @constructs
   */
  constructor(name: string, set: string, price: number, condition: string, foil: boolean) {
    this.name = name;
    this.set = set;
    this.price = price;
    this.condition = condition;
    this.foil = foil;
  }
}
