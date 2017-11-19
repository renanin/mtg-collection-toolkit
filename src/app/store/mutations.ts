/* eslint no-param-reassign: ["off"] */

import Collection from '../classes/collection';
import Set from '../classes/set';
import Card from '../classes/card';
import bus from '../../bus';

export default {
  addCard(state, card: Card) {
    state.collection.sets[card.getSet()].cards.push(card);
    bus.$emit('update');
  },
  loadSet(state, setData: Set) {
    if (!state.collection.sets[setData.getCode()]) {
      state.collection.sets[setData.getCode()] = new Set(setData.getCode(), setData.getName());
    }
    state.setInfo[setData.getCode()] = setData;
    bus.$emit('update');
  },
  loadCollection({ state, dispatch }, collection: Collection) {
    const sets = Object.keys(collection.sets);
    const newCollection = new Collection();
    for (let i = 0; i < sets.length; i += 1) {
      const set = collection.sets[sets[i]];
      newCollection.sets[sets[i]] = new Set(set.getCode(), set.getName());
      dispatch('loadSet', set.getCode(), set.getName());
      for (let a = 0; a < set.getCards().length; a += 1) {
        const card = set.getCard(a);
        newCollection.sets[sets[i]].addCard(
          new Card(
            card.getName(),
            card.getSet(),
            card.getSetName(),
            card.getId(),
            card.getQuantity(),
            card.getFoilQuantity()));
      }
    }
    state.collection = newCollection;
  },
};
