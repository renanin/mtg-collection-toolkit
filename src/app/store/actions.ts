import paginate from '../util/paginate';
import Card from '../classes/card';
import Set from '../classes/set';

export default {
  loadCards({ commit }, code: string) {
    paginate(`https://api.scryfall.com/cards/search?order=set&q=%2B%2Be%3A${code}`)
    .then((cards) => {
      const newCards = [];
      cards.forEach((card) => {
        newCards.push(new Card(card.name, card.usd));
      });
      commit('setCards', {
        code,
        cards: newCards,
      });
    }).catch((e) => {
      console.log(e);
    });
  },
  loadSets({ commit, state }) {
    paginate('https://api.scryfall.com/sets/').then((sets) => {
      sets.forEach((set) => {
        commit('addSet', new Set(set.name, set.code, set.icon_svg_uri, set.card_count));
      });
    }).catch((e) => {
      console.error(e);
    });
  },
};
