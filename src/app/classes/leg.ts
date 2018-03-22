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
   * The total value of the cash and cards
   * @name Leg#value
   * @type {number}
   */
  get value(): number {
    let value = this.cash;
    this.cards.forEach((card) => {
      value += Number(card.marketPrice);
    });
    return value;
  }

  /**
   * @constructs
   */
  constructor() {
    this.cash = 0;
    this.cards = [];
  }
}
