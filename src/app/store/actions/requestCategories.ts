import async from 'async';
import fs from 'fs';
import request from 'request';
import CategoryResult from "../../classes/interfaces/categoryResult";
import CategorySearchResults from '../../classes/interfaces/categorySearchResults';

/**
 * Gets a new list of categories from TCGPlayer & caches it
 * @returns {Promise<CategoryResult[]>} A promise that will resolve with a list of categories from the API
 */
export default function requestCategories({ state: state }): Promise<CategoryResult[]> {
  return new Promise((resolve, reject) => {
    let offset = 0;
    let results: CategoryResult[] = [];
    let hasMore = true;
    async.whilst(
      () => hasMore,
      (next) => {
        request.get(
          {
            url: `http://api.tcgplayer.com/catalog/categories/1/groups?offset=${offset}`,
            auth: {
              bearer: state.accessToken,
            },
          },
          (err, res, body) => {
            if (err) {
              next(err);
            } else {
              try {
                const searchResults: CategorySearchResults = JSON.parse(body);
                offset += 10;
                results = results.concat(searchResults.results);
                if (offset > searchResults.totalItems) {
                  hasMore = false;
                }
                next();
              } catch (e) {
                next(e);
              }
            }
          },
        );
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          fs.writeFile('cache/categories.json', JSON.stringify(results), (err) => {
            if (err) {
              console.error(err);
            }
            resolve(results);
          });
        }
      },
    );
  });
};
