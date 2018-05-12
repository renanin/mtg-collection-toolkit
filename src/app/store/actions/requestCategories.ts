import async from 'async';
import fs from 'fs';
import request from 'request';
import CategoryResult from "../../classes/interfaces/tcgplayer/categoryResult";
import CategorySearchResults from '../../classes/interfaces/tcgplayer/categorySearchResults';

/**
 * Gets a new list of categories from TCGPlayer & caches it
 * @returns {Promise<CategoryResult[]>} A promise that will resolve with a list of categories from the API
 */
export default function requestCategories({ state: state }): Promise<CategoryResult[]> {
  return new Promise((resolve, reject) => {
    console.group('Requesting list of category groups from TCGPlayer...');
    let offset = 0;
    let results: CategoryResult[] = [];
    let hasMore = true;
    async.whilst(
      () => hasMore,
      (next) => {
        console.log('Getting categories...');
        request.get(
          {
            url: `http://api.tcgplayer.com/catalog/categories/1/groups?offset=${offset}`,
            auth: {
              bearer: state.accessToken,
            },
          },
          (err, res, body) => {
            if (err) {
              console.error(`Error getting http://api.tcgplayer.com/catalog/categories/1/groups?offset=${offset}: ${err}`);
              // Fatal error
              next(err);
            } else {
              const searchResults: CategorySearchResults = JSON.parse(body);
              offset += 10;
              console.log(`Got categories, ${offset} retrieved so far.`);
              results = results.concat(searchResults.results);
              if (offset > searchResults.totalItems) {
                hasMore = false;
                console.log('Done.');
              }
              next();
            }
          },
        );
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Writing categories to cache...')
          fs.writeFile('cache/categories.json', JSON.stringify(results), (err) => {
            if (err) {
              // Nonfatal error
              console.warn(`Error writing categories to cache: ${err}`);
            }
            resolve(results);
            console.groupEnd();
          });
        }
      },
    );
  });
};
