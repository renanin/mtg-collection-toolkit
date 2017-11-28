import Vue from 'vue';
import Set from '../classes/set';
import Card from '../classes/card';

interface CardList {
  code: string;
  cards: Card[];
}

export default {
  addSet(state, set: Set) {
    Vue.set(state.sets, set.getCode(), set);
  },
  setCards(state, cards: CardList) {
    Vue.set(state.sets[cards.code], 'cards', cards.cards);
  },
};
