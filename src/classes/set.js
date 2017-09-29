import Card from './card';

export default class Set {
  constructor(code, name) {
    this.name = name;
    this.code = code;
    this.cards = [];
  }
  addCard(card) {
    this.cards.push(card);
  }
  cardCount() {
    let count = 0;
    this.cards.forEach((card) => {
      count += Number(card.quantity);
      count += Number(card.foilQuantity);
    });
    return count;
  }
  findCard(name) {
    for (let i = 0; i < this.cards.length; i += 1) {
      if (this.cards[i].name === name) {
        return this.cards[i];
      }
    }
    return new Card();
  }
}
