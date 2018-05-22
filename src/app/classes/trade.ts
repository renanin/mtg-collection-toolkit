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

  /**
   * Returns whether the leg at the specified index has the lowest value of all the legs
   * @param {number} index The index of the leg to check
   * @return {boolean}
   */
  isGreater(index: number): boolean {
    let greatestValue = this.legs[index].value;
    this.legs.forEach((leg) => {
      if (leg.value > greatestValue) {
        greatestValue = leg.value;
      }
    });
    return !(greatestValue > this.legs[index].value);
  }

  /**
   * Returns an identical clone of this trade
   * @return {Trade}
   */
  clone(): Trade {
    const clone = new Trade(0);
    this.legs.forEach((leg: Leg) => {
      clone.legs.push(leg.clone());
    });
    return clone;
  }
}
