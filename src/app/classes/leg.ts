import Card from './card';

/**
 * @class Leg
 * @classdesc An individual side of a trade
 */
export default class Leg {
  /**
   * The amount of cash in the leg
   * @name Leg#cash
   * @type {number}
   */
  cash: number;

  /**
   * The cards in the leg
   * @name Leg#cards
   * @type {Card[]}
   */
  cards: Card[];

  /**
   * @constructs
   */
  constructor() {
    this.cash = 0;
    this.cards = [];
  }
}
