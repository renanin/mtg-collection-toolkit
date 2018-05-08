import fs from 'fs';
import read from 'read-big-file';
import request from 'request';
import BecomesCard from '../../classes/interfaces/becomesCard';
import CategoryResult from '../../classes/interfaces/tcgplayer/categoryResult';
import MarketPriceSearchResult from '../../classes/interfaces/tcgplayer/marketPriceSearchResult';
import PricePayload from '../../classes/interfaces/pricePayload';
import SetCodeMap from '../../classes/interfaces/setCodeMap';
import SKUSearchResults from '../../classes/interfaces/tcgplayer/skuSearchResults';

/**
 * Fetches the current TCGPlayer price of the supplied card
 * @returns {Promise<number>} A promise that will resolve with the price of the card
 */
export default function fetchPrice({ dispatch, state }, payload: PricePayload): Promise<number> {
  return new Promise(async (resolve, reject) => {
    console.group(`Fetching price for "${payload.card.name}" in ${payload.printing}...`);
    const categories = <CategoryResult[]>await (() => {
      return new Promise((resolveCategories) => {
        console.log('Attempting to read categories from cache...');
        read('cache/categories.json', true)
          .then((categoriesFromCache) => {
            resolveCategories(categoriesFromCache);
          })
          .catch((err) => {
            console.warn(`Error reading categories from cache: ${err}`);
            // Nonfatal error
            resolveCategories([]);
          });
      });
    })();
    try {
      const id = <number>await (() => {
        return new Promise(async (resolveID, rejectID) => {
          let found = false;
          console.group(`Search for group ID for ${payload.printing} in category list...`);
          categories.forEach((category) => {
            if (typeof category.abbreviation === 'string' && category.abbreviation.toUpperCase() === payload.printing.toUpperCase()) {
              console.log(`Found group ID: ${category.groupId}`);
              console.groupEnd();
              found = true;
              resolveID(category.groupId);
            }
          });
          if (!found) {
            console.group('No match in category list. Searching in set code map...');
            const setCodeMap = <SetCodeMap>await (() => {
              return new Promise((resolveSCM) => {
                read('cache/setCodeMap.json')
                  .then((map) => {
                    resolveSCM(map);
                  })
                  .catch((err) => {
                    console.warn(`Error reading set code map: ${err}`);
                    // Nonfatal error
                    resolveSCM({});
                  });
              });
            })();
            if (typeof setCodeMap[payload.printing.toUpperCase()] === 'string') {
              console.log(`Found category ID in set code map: ${setCodeMap[payload.printing.toUpperCase()]}`);
              console.groupEnd();
              console.groupEnd();
              found = true;
              resolveID(setCodeMap[payload.printing.toUpperCase()]);
            } else {
              console.group(`No match in set code map. Attempting to search by name "${payload.card.set_name}"`);
              console.log(`Resolving ${payload.card.purchase_uris.tcgplayer}`);
              request(
                // This makes sure we get the same name TCGPlayer uses
                payload.card.purchase_uris.tcgplayer,
                (err, res, body) => {
                  if (err) {
                    // Fatal error - No options left
                    console.error(`Error resolving ${payload.card.purchase_uris.tcgplayer}: ${err}. Could not determine a category ID!`);
                    console.groupEnd();
                    console.groupEnd();
                    console.groupEnd();
                    rejectID(err);
                  } else {
                    const setName = res.request.path.replace(/^\/magic\/([a-z\-]+)\/.*$/, '$1').replace(/\-/g, ' ').toUpperCase();
                    console.log(`Determined set name: "${setName}". Searching in category list...`);
                    let found = false;
                    categories.forEach((category) => {
                      if (category.name.replace(/[^a-zA-Z\s]/g, '').toUpperCase() === setName) {
                        console.log(`Found category ID: ${category.groupId}. Writing changes to cache...`);
                        found = true;
                        fs.writeFile('cache/setCodeMap.json', JSON.stringify(setCodeMap), (err) => {
                          if (err) {
                            console.warn(`Error writing to set code map: ${err}`);
                          }
                          // Nonfatal error
                          console.groupEnd();
                          console.groupEnd();
                          console.groupEnd();
                          resolveID(category.groupId);
                        });
                      }
                    });
                    if (!found) {
                      console.error(`No category ID could be determined for ${payload.printing} / ${setName}.`);
                      console.groupEnd();
                      console.groupEnd();
                      console.groupEnd();
                      rejectID('No ID found');
                    }
                  }
                },
              );
            }
          }
        });
      })();
      const sku = await (() => {
        return new Promise(async (resolveSKU, rejectSKU) => {
          console.group(`Finding SKU for "${payload.card.name}" in group ${id}`);
          const skus = await (() => {
            return new Promise((resolveSKUs) => {
              read('cache/skus.json', true)
                .then((skus) => {
                  resolveSKUs(skus);
                })
                .catch((err) => {
                  console.warn(`Error reading SKUs from cache: ${err}`);
                  // Nonfatal error
                  resolveSKUs({});
                });
            });
          })();
          if (skus[id] && skus[id][payload.card.name]) {
            console.log(`Found SKU: ${skus[id][payload.card.name]}`);
            console.groupEnd();
            resolveSKU(skus[id][payload.card.name]);
          } else {
            console.group('No SKU for "${payload.card.name}" in group ${id} found in cache. Requesting TCGPlayer...');
            request.get(
              {
                url: `http://api.tcgplayer.com/catalog/products?categoryId=1&groupId=${id}&productName=${encodeURIComponent(payload.card.name)}`,
                auth: {
                  bearer: state.accessToken,
                },
              },
              (err, res, body) => {
                if (err) {
                  // Fatal error, no SKU can be determined
                  console.error(`Could not get SKU for "${payload.card.name}" in group ${id} from TCGPlayer: ${err}`);
                  console.groupEnd();
                  console.groupEnd();
                  rejectSKU(err);
                } else {
                  console.log(`Got SKU results for "${payload.card.name}" in group ${id} from TCGPlayer`);
                  const results: SKUSearchResults = JSON.parse(body);
                  // @TODO: Handle multiple results (is this possible?)
                  if (results.totalItems === 1) {
                    // @TODO: Different conditions (picks near mint automatically)
                    const sku = results.results[0].productConditions[0].productConditionId;
                    console.log(`Determined SKU: ${sku}`);
                    if (!skus[id]) {
                      skus[id] = {};
                    }
                    skus[id][payload.card.name] = sku;
                    console.log('Writing new SKU to cache...');
                    fs.writeFile(
                      'cache/skus.json',
                      JSON.stringify(skus),
                      (err) => {
                        if (err) {
                          console.warn(`Error writing to cache: ${err}`);
                        }
                        console.groupEnd();
                        console.groupEnd();
                        // Nonfatal error, we can still resolve the SKU
                        resolveSKU(sku);
                      },
                    );
                  }
                }
              },
            );
          }
        });
      })();
      console.group(`Fetching price for SKU ${sku}...`);
      request.get(
        {
          url: `http://api.tcgplayer.com/pricing/marketprices/${sku}`,
          auth: {
            bearer: state.accessToken,
          },
        },
        (err, res, body) => {
          if (err) {
            console.error(`Error getting price: ${err}`);
            console.groupEnd();
            console.groupEnd();
            // Fatal error, no price can be determined
            reject(err);
          } else {
            const result: MarketPriceSearchResult = JSON.parse(body);
            console.log(`Got price: $${result.results[0].price}`);
            console.groupEnd();
            console.groupEnd();
            resolve(result.results[0].price);
          }
        },
      );
    } catch (err) {
      reject(err);
    }
  });
}
