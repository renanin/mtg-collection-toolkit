import Card from './card';

export default class Trade {
  private myCards: Card[];
  private theirCards: Card[];
  constructor(myCards: Card[], theirCards: Card[]) {
    this.myCards = myCards;
    this.theirCards = theirCards;
  }
  getMyCards() {
    return this.myCards;
  }
  getTheirCards() {
    return this.theirCards;
  }
}
