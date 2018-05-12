import Printing from './printing';

/**
 * @interface BecomesCard
 * @desc Contains information that will be used to resolve to a card
 */
export default interface BecomesCard {
  /**
   * The name, in text, of the card
   * @name BecomesCard#name
   * @type {string}
   */
  name: string;

  /**
   * The quantity of the card
   * @name BecomesCard#quantity
   * @type {number}
   */
  quantity: number;

  /**
   * The possible printings and IDs of the card
   * @name BecomesCard#printings
   * @type {Printing[]}
   */
  printings: Printing[];

  /**
   * The actual printing of the card
   * @name BecomesCard#printing
   * @type {string}
   */
  printing?: string;

  /**
   * The ID of the card
   * @name BecomesCard#id
   * @type {string}
   */
  id: string;

  /**
   * The price of the card
   * @name BecomesCard#marketPrice
   * @type {number}
   */
  marketPrice: number;
}
