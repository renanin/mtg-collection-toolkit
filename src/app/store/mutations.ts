import { Store } from 'vuex';
import state from './state';
import SetsObject from '../classes/setsObject';
import SetResponse from '../classes/setResponse';
import Set from '../classes/set';
import CardResponse from '../classes/cardResponse';
import Card from '../classes/card';
import Collection from '../classes/collection';

export default {
  loadSet(state: state, set: SetResponse) {
    state.sets[set.code] = new Set(set.code, set.name, set.card_count);
  },
  addCard(state: state, payload: {
    set: string;
    card: CardResponse;
  }) {
    let quantity = 0;
    // @TODO: This assumes the collection is in the memory
    if (state.collection[payload.set] && state.collection[payload.set][payload.card.id]) {
      quantity = state.collection[payload.set][payload.card.id];
    }
    state.sets[payload.set].addCard(
      new Card(
        payload.card.id,
        payload.card.name,
        Number(payload.card.usd),
        Number(quantity),
      ),
    );
  },
  loadCollection(state: state, collection: Collection) {
    state.collection = collection;
  },
  setQuantity(state: state, payload: {
    quantity: string;
    set: string;
    id: string;
  }) {
    for (let i = 0; i < state.sets[payload.set].getCards().length; i += 1) {
      if (state.sets[payload.set].getCards()[i].getID() === payload.id) {
        state.sets[payload.set].getCards()[i].setQuantity(Number(payload.quantity));
      }
    }
  },
  emptySets(state: state) {
    state.sets = {};
  },
};
