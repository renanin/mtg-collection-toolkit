import SetsObject from '../classes/setsObject';
import SetResponse from '../classes/setResponse';
import Set from '../classes/set';
import CardResponse from '../classes/cardResponse';
import Card from '../classes/card';
import Collection from '../classes/collection';

export default {
  loadSet(state, set: SetResponse) {
    state.sets[set.code] = new Set(set.code, set.name, set.card_count);
  },
  addCard(state, payload: {
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
        quantity,
      ),
    );
  },
  loadCollection(state, collection: Collection) {
    state.collection = collection;
  },
};
