/* eslint no-param-reassign: ["off"] */

import electron from 'electron';
import Collection from '../classes/collection';
import Set from '../classes/set';
import Card from '../classes/card';
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
  loadCollection(state, collection) {
    const sets = Object.keys(collection.sets);
    const newCollection = new Collection();
    for (let i = 0; i < sets.length; i += 1) {
      const set = collection.sets[sets[i]];
      newCollection.sets[sets[i]] = new Set(set.code, set.name);
      ipcRenderer.send('set', {
        code: set.code,
        name: set.name,
      });
      for (let a = 0; a < set.cards.length; a += 1) {
        const card = set.cards[a];
        newCollection.sets[sets[i]].addCard(
          new Card(card.name, card.set, card.setName, card.id, card.quantity, card.foilQuantity));
      }
    }
    state.collection = newCollection;
  },
};
