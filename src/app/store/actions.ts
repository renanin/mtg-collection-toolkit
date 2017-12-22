import async from 'async';
import request from 'request';
import read from 'read-big-file';
import paginate from '../util/paginate';
import SetsObject from '../classes/setsObject';
import SetResponse from '../classes/setResponse';
import Set from '../classes/set';
import Card from '../classes/card';
import bus from '../../bus';

export default {
  fetchSets({ commit }) {
    paginate('https://api.scryfall.com/sets/').then((response) => {
      response.forEach((set: SetResponse) => {
        commit('loadSet', set);
      });
      bus.$emit('setsLoaded');
    }).catch((e) => {
      bus.$emit('notify', `Could not fetch sets: ${e}`);
    });
  },
  fetchCards({ commit }, code: string) {
    paginate(`https://api.scryfall.com/cards/search?q=e%3A${code}`).then((response) => {
      response.forEach((card: Card) => {
        commit('addCard', {
          card,
          set: code,
        });
      });
      bus.$emit('cardsLoaded');
    }).catch((e) => {
      bus.$emit('notify', `Could not fetch cards: ${e}`);
    });
  },
  readCollection({ commit, dispatch }) {
    console.log('Reading collection');
    read('userdata/collection.mtgcollection', true).then((response) => {
      commit('loadCollection', response);
      commit('emptySets');
      dispatch('fetchSets');
    }).catch((e) => {
      bus.$emit('notify', `Could not read collection: ${e}`);
    });
  },
};
