import Printing from './printing';

/**
 * @class Item
 * @classdesc A representation of a card or cash in a trade
 */
export default class Item {
  /**
   * The name of the card
   * @name Item#name
   * @type {string}
   */
  name: string;

  /**
   * Possible printings of the card
   * @name Item#printings
   * @type {Printing[]}
   */
  printings: Printing[];

  /**
   * The selected printing of the card
   * @name Item#printing
   * @type {Printing}
   */
  printing: Printing;

  /**
   * Whether this is a card or cash
   * @name Item#cash
   * @type {boolean}
   */
  cash: boolean;

  /**
   * @constructs
   * @prop {string} name The name of the card
   */
  constructor(name: string = '', printings: Printing[] = [], printing: Printing = new Printing(), cash: boolean = false) {
    this.name = name;
    this.printings = printings;
    this.printing = printing;
    this.cash = cash;
  }
}
