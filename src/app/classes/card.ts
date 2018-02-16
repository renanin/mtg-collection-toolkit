import Printing from './printing';

/**
 * @class Card
 * @classdesc An individual card
 */
export default class Card {
  /**
   * The name of the card
   * @name Card#name
   * @type {string}
   */
  name: string;
  
  /**
   * The printing of the card
   * @name Card#set
   * @type {string}
   */
  set: string;

  /**
   * A list of printings of this card
   * @name Card#printings
   * @type {Printing[]}
   */
  printings: Printing[];

  /**
   * @constructs
   */
  constructor() {
    this.name = '';
    this.set = '';
    this.printings = [];
  }
}
