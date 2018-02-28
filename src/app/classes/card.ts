/**
 * @class Card
 * @classdesc Represents a card
 */
export default class Card {
  /**
   * The multiverse ID of the card
   * @name Card#id
   * @type {number}
   */
  id: number;

  /**
   * @constructs
   * @prop {number} id The ID of the card
   */
  constructor(id: number) {
    this.id = id;
  }
}
