/* eslint no-param-reassign: ["off"] */

import Set from '../classes/set';

export default {
  addCard(state, card) {
    if (!state.collection.sets[card.set]) {
      state.collection.sets[card.set] = new Set(card.set, card.setName);
    }
    state.collection.sets[card.set].cards.push(card);
  },
};
