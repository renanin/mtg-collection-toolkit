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
    let value;
    if (isNaN(Number(this.cash))) {
      value = 0;
    } else {
      value = Number(this.cash);
    }
    this.cards.forEach((card) => {
      if (!isNaN(Number(card.price))) {
        value += Number(card.price);
      }
    });
    return Math.round(value * 100) / 100;
  }

  get cashString(): string {
    if (Number(this.cash) === 0) {
      return '';
    } else {
      return `${this.cash}`;
    }
  }

  /**
   * @constructs
   */
  constructor() {
    this.cash = 0;
    this.cards = [];
  }

  /**
   * Clones the leg
   * @returns {Leg}
   */
  clone(): Leg {
    const clone = new Leg();
    clone.cash = this.cash;
    clone.cards = this.cards
    return clone;
  }
}
