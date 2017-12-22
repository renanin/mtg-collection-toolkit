import SetsObject from '../classes/setsObject';
import CardResponse from '../classes/cardResponse';
import Card from '../classes/card';
import Collection from '../classes/collection';

export default {
  loadSets(state, sets: SetsObject) {
    state.sets = sets;
  },
  addCard(state, payload: {
    set: string;
    card: CardResponse;
  }) {
    state.sets[payload.set].addCard(
      new Card(
        payload.card.id,
        payload.card.name,
        Number(payload.card.usd),
      ),
    );
  },
  loadCollection(state, collection: Collection) {
    state.collection = collection;
  },
};
