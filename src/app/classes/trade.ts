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
   * The user's cash in the trade
   * @name Trade#myCash
   * @type {number}
   */
  myCash: number;

  /**
   * The other party's cash in the trade
   * @name Trade#theirCash
   * @type {number}
   */
  theirCash: number;
  
  /**
   * @constructs
   * @param {Date} date The date on which the Trade took place
   * @param {Item[]} myCards The list of the user's cards
   * @param {Item[]} theirCards The list of the other party's cards
   * @param {number} mycash The amount of the user's cash
   * @param {number} theirCash The amount of the other party's cash 
   */
  constructor(date: Date = new Date(), myCards: Card[] = [], theirCards: Card[] = [], myCash: number = 0, theirCash: number = 0) {
    this.date = date;
    this.myCards = myCards;
    this.theirCards = theirCards;
    this.myCash = myCash;
    this.theirCash = theirCash;
  }

  /**
   * Gets the total value of the user's cards and cash
   * @name Trade#myValue
   * @type {number}
   */
  get myValue(): number {
    let myValue = this.myCash;
    this.myCards.forEach((card) => {
      if (isNaN(card.price)) {
        myValue += 0;
        console.warn(`No valid price for ${card.name}`);
      } else {
        myValue += card.price;
      }
    });
    return myValue;
  }

  /**
   * Gets the total value of the other party's cards and cash
   * @name Trade#theirValue
   * @type {number}
   */
  get theirValue(): number {
    let theirValue = this.theirCash;
    this.theirCards.forEach((card) => {
      if (isNaN(card.price)) {
        theirValue += 0;
        console.warn(`No valid price for ${card.name}`);
      } else {
        theirValue += card.price;
      }
    });
    return theirValue;
  }

  /**
   * Gets the user's profit
   * @name Trade#profit
   * @type {number}
   */
  get profit(): number {
    return this.theirValue - this.myValue;
  }
}
