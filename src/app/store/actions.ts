import fs from 'fs';
import read from 'read-big-file';
import request from 'request';
import SetResponse from '../classes/setResponse';
import paginate from '../util/paginate';

export default {
  /**
   * Attempts to fetch set information from Scryfall, or otherwise from the cache
   */
  async fetchSets({ commit }) {
    try {
      const sets = <SetResponse[]>await paginate('https://api.scryfall.com/sets/');
      fs.writeFile(
        'cache/sets.json',
        JSON.stringify(sets),
        (err) => {
          if (err) {
            // @TODO
            console.error(`Could not write sets to cache: ${err}`);
          }
          // Continue regardless
          commit('loadSets', sets);
        },
      );
    } catch (e) {
      try {
        const sets = await read('cache/sets.json', true);
        // @TODO
        console.log('Forced to read from cache');
        commit('loadSets', sets);
      } catch (e2) {
        // @TODO
        console.error(e2);
      }
    }
  },
};
