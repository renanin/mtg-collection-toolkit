import request from 'request';
import Collection from '../classes/collection';
import SetsResponse from '../classes/response/sets';

export default {
  /**
   * Loads the user's collection
   */
  loadCollection({ commit }) {
    // @TODO: Read from file
    commit('setCollection', new Collection());
  },
  /**
   * Fetches a list of sets from Scryfall
   */
  fetchSets({ commit }) {
    return new Promise((resolve, reject) => {
      request(
        `https://api.scryfall.com/sets/`,
        (err, res, body) => {
          if (err) {
            reject(err);
          } else {
            const result: SetsResponse = JSON.parse(body);
            result.data.forEach((set) => {
              commit('addSet', set);
            });
            resolve();
          }
        },
      );
    });
  }
};
