import async from 'async';
import request from 'request';
import paginate from '../util/paginate';
import SetsObject from '../classes/setsObject';
import SetResponse from '../classes/setResponse';
import Set from '../classes/set';
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
};
