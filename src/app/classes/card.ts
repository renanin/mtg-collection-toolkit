import Condition from './interfaces/condition';

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
   * The condition of the card
   * @name Card#condition
   * @type {Condition}
   */
  condition: Condition;

  /**
   * @constructs
   * @prop {string} id The ID of the card
   * @prop {number} quantity The quantity of the card
   * @prop {Condition} condition The condition of the card
   */
  constructor(id: string, quantity: number, condition: Condition) {
    this.id = id;
    this.quantity = quantity;
    this.condition = condition;
  }
}
