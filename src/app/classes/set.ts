import Card from './card';

/**
 * @class Set
 * @classdesc Represents a single set and all of its cards
 */
export default class Set {
  /**
   * The set code
   * @name Set#code
   * @type {string}
   */
  code: string;

  /**
   * The full name of the set
   * @name Set#name
   * @type {string}
   */
  name: string;

  /**
   * The cards in the set
   * @name Set#cards
   * @type {Card[]}
   */
  cards: Card[];

  /**
   * The URI of the icon of the set
   * @name Set#icon
   * @type {string}
   */
  icon: string;

  /**
   * @constructs
   * @prop {string} code The set code
   * @prop {string} name The full name of the set
   * @prop {string} icon The URI of the icon of the set
   */
  constructor(code: string, name: string, icon: string) {
    this.code = code;
    this.name = name;
    this.icon = icon;
    this.cards = [];
  }
}
