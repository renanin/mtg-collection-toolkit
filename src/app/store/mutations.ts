import Vue from 'vue';
import Set from '../classes/set';
import Card from '../classes/card';

interface CardList {
  code: string;
  cards: Card[];
}

interface QuantityTarget {
  set: string;
  index: number;
}

export default {
  addSet(state, set: Set) {
    Vue.set(state.sets, set.getCode(), set);
  },
  setCards(state, cards: CardList) {
    Vue.set(state.sets[cards.code], 'cards', cards.cards);
  },
  incrementQuantity(state, target: QuantityTarget) {
    state.sets[target.set].cards[target.index].increment();
  },
  decrementQuantity(state, target: QuantityTarget) {
    state.sets[target.set].cards[target.index].decrement();
  }
};
