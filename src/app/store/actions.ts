import async from 'async';
import request from 'request';
import paginate from '../util/paginate';
import SetsObject from '../classes/setsObject';
import SetResponse from '../classes/setResponse';
import Set from '../classes/set';
import Card from '../classes/card';
import bus from '../../bus';

export default {
  fetchSets({ commit }) {
    paginate('https://api.scryfall.com/sets/').then((response) => {
      const sets: SetsObject = {};
      response.forEach((set: SetResponse) => {
        sets[set.code] = new Set(set.code, set.name, set.card_count);
      });
      commit('loadSets', sets);
      bus.$emit('setsLoaded');
    }).catch((e) => {
      console.error(e);
    });
  },
  fetchSet({ commit }, code: string) {
    paginate(`https://api.scryfall.com/cards/search?q=e%3A${code}`).then((response) => {
      response.forEach((card: Card) => {
        commit('addCard', {
          card,
          set: code,
        });
      });
      bus.$emit('cardsLoaded');
    }).catch((e) => {
      console.error(e);
    });
  },
};
