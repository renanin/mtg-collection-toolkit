export default class Card {
  constructor(name, set, setName, id, quantity = 0, foilQuantity = 0) {
    this.name = name;
    this.set = set;
    this.setName = setName;
    this.id = id;
    this.quantity = quantity;
    this.foilQuantity = foilQuantity;
  }
}
