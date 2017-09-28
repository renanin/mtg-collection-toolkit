/* eslint no-param-reassign: ["off"] */

import electron from 'electron';
import Set from '../classes/set';
import bus from '../bus';

const { ipcRenderer } = electron;

export default {
  addCard(state, card) {
    state.collection.sets[card.set].cards.push(card);
    bus.$emit('update');
  },
  loadSet(state, setData) {
    if (!state.collection.sets[setData.code]) {
      state.collection.sets[setData.code] = new Set(setData.code, setData.name);
    }
    state.setInfo[setData.code] = setData;
    bus.$emit('update');
  },
};
