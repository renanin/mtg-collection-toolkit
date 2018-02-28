import Leg from './leg';

/**
 * @class Trade
 * @classdesc Represents a single trade
 */
export default class Trade {
  /**
   * The legs (always 2) of the trade
   * @name Trade#legs
   * @type {Leg[]}
   */
  legs: Leg[];

  /**
   * @constructs
   * @prop {number} legCount The number of empty legs to automatically include (default = 0)
   */
  constructor(legCount: number = 0) {
    this.legs = [];
    for (let i = 0; i < legCount; i += 1) {
      this.legs.push(new Leg());
    }
  }
}
