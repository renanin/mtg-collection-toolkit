import Condition from './condition';

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
   * @type {Object[]}
   */
  printings: {
    code: string;
    id: string;
    price: number;
  }[];

  /**
   * The actual printing of the card
   * @name BecomesCard#printing
   * @type {string}
   */
  printing?: string;

  /**
   * The condition of the card
   * @name BecomesCard#condition
   * @type {Condition}
   */
  condition?: Condition;

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
