import Item from './item';

/**
 * @class TradeDraft
 * @classdesc An individual TradeDraft
 */
export default class TradeDraft {
  /**
   * The date on which the TradeDraft took place
   * @name TradeDraft#date
   * @type {Date}
   */
  date: Date;

  /**
   * The user's cards in the TradeDraft
   * @name TradeDraft#myCards
   * @type {Item[]}
   */
  myCards: Item[];

  /**
   * The other party's cards in the TradeDraft
   * @name TradeDraft#theirCards
   * @type {Item[]}
   */
  theirCards: Item[];
  
  /**
   * @constructs
   * @param {Date} date The date on which the TradeDraft took place
   * @param {Item[]} myCards The list of the user's cards
   * @param {Item[]} theirCards The list of the other party's cards
   */
  constructor(date: Date = new Date(), myCards: Item[] = [], theirCards: Item[] = []) {
    this.date = date;
    this.myCards = myCards;
    this.theirCards = theirCards;
  }

  /**
   * Adds a card to the user's side of the TradeDraft
   */
  addMyCard() {
    this.myCards.push(new Item());
  }

  /**
   * Adds a card to the party's side of the TradeDraft
   */
  addTheirCard() {
    this.theirCards.push(new Item());
  }
}
