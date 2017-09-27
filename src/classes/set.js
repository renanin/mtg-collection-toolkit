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
}
