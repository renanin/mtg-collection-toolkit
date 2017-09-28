/* eslint no-param-reassign: ["off"] */

import electron from 'electron';
import Set from '../classes/set';

const { ipcRenderer } = electron;

export default {
  addCard(state, card) {
    if (!state.collection.sets[card.set]) {
      ipcRenderer.send('set', card.set);
      state.collection.sets[card.set] = new Set(card.set, card.setName);
    }
    state.collection.sets[card.set].cards.push(card);
  },
};
