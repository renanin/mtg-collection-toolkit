import Item from './item';

/**
 * @class Trade
 * @classdesc An individual trade
 */
export default class Trade {
  /**
   * The date on which the trade took place
   * @name Trade#date
   * @type {Date}
   */
  date: Date;

  /**
   * The user's cards in the trade
   * @name Trade#myCards
   * @type {Item[]}
   */
  myCards: Item[];

  /**
   * The other party's cards in the trade
   * @name Trade#theirCards
   * @type {Item[]}
   */
  theirCards: Item[];
  
  /**
   * @constructs
   * @param {Date} date The date on which the trade took place
   * @param {Item[]} myCards The list of the user's cards
   * @param {Item[]} theirCards The list of the other party's cards
   */
  constructor(date: Date = new Date(), myCards: Item[] = [], theirCards: Item[] = []) {
    this.date = date;
    this.myCards = myCards;
    this.theirCards = theirCards;
  }

  /**
   * Adds a card to the user's side of the trade
   */
  addMyCard() {
    this.myCards.push(new Item());
  }

  /**
   * Adds a card to the party's side of the trade
   */
  addTheirCard() {
    this.theirCards.push(new Item());
  }
}
