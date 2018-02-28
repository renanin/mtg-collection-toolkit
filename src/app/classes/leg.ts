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
   * @constructs
   */
  constructor() {
    this.cash = 0;
  }
}
