/* eslint no-param-reassign: ["off"] */

import electron from 'electron';
import Set from '../classes/set';
import bus from '../bus';

const { ipcRenderer } = electron;

export default {
  addCard(state, card) {
    if (!state.collection.sets[card.set]) {
      ipcRenderer.send('set', card.set);
      state.collection.sets[card.set] = new Set(card.set, card.setName);
    }
    state.collection.sets[card.set].cards.push(card);
    bus.$emit('update');
  },
  loadSet(state, setData) {
    state.setInfo[setData.code] = setData;
    bus.$emit('update');
  },
};
