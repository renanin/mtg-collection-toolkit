import Card from './card';

/**
 * @class Trade
 * @classdesc An individual Trade
 */
export default class Trade {
  /**
   * The date on which the Trade took place
   * @name Trade#date
   * @type {Date}
   */
  date: Date;

  /**
   * The user's cards in the Trade
   * @name Trade#myCards
   * @type {Card[]}
   */
  myCards: Card[];

  /**
   * The other party's cards in the Trade
   * @name Trade#theirCards
   * @type {Card[]}
   */
  theirCards: Card[];
  
  /**
   * @constructs
   * @param {Date} date The date on which the Trade took place
   * @param {Item[]} myCards The list of the user's cards
   * @param {Item[]} theirCards The list of the other party's cards
   */
  constructor(date: Date = new Date(), myCards: Card[] = [], theirCards: Card[] = []) {
    this.date = date;
    this.myCards = myCards;
    this.theirCards = theirCards;
  }

  /**
   * Gets the total value of the user's cards
   * @name Trade#myValue
   * @type {number}
   */
  get myValue(): number {
    let myValue = 0;
    this.myCards.forEach((card) => {
      myValue += card.price;
    });
    return myValue;
  }

  /**
   * Gets the total value of the other party's cards
   * @name Trade#theirValue
   * @type {number}
   */
  get theirValue(): number {
    let theirValue = 0;
    this.theirCards.forEach((card) => {
      theirValue += card.price;
    });
    return theirValue;
  }

  /**
   * Gets the user's profit
   * @name Trade#profit
   * @type {number}
   */
  get profit(): number {
    return this.myValue - this.theirValue;
  }
}
