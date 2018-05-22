import async from 'async';
import fs from 'fs';
import read from 'read-big-file';
import request from 'request';
import BecomesCard from '../../classes/interfaces/becomesCard';
import CategoryResult from '../../classes/interfaces/tcgplayer/categoryResult';
import MarketPriceSearchResult from '../../classes/interfaces/tcgplayer/marketPriceSearchResult';
import PricePayload from '../../classes/interfaces/pricePayload';
import SetCodeMap from '../../classes/interfaces/setCodeMap';
import SKUDictionary from '../../classes/interfaces/skuDictionary';
import SKUSearchResults from '../../classes/interfaces/tcgplayer/skuSearchResults';

/**
 * Fetches the current TCGPlayer price of the supplied card
 * @returns {Promise<number>} A promise that will resolve with the price of the card
 */
export default function fetchPrice({ dispatch, state }, payload: PricePayload): Promise<number> {
  return new Promise(async (resolve, reject) => {
    console.group(`Fetching price for ${payload.card.condition} "${payload.card.name}" in ${payload.printing.name}...`);
    const categories = <CategoryResult[]>await (() => {
      return new Promise((resolveCategories) => {
        console.log('Attempting to read categories from cache...');
        read('cache/categories.json', true)
          .then((categoriesFromCache) => {
            resolveCategories(categoriesFromCache);
          })
          .catch(async (err) => {
            console.warn(`Error reading categories from cache: ${err}`);
            // Nonfatal error
            resolveCategories(await dispatch('requestCategories'));
          });
      });
    })();
    try {
      const id = <number>await (() => {
        return new Promise(async (resolveID, rejectID) => {
          let found = false;
          console.group(`Search for group ID for ${payload.printing.code} in category list...`);
          categories.forEach((category) => {
            if (typeof category.abbreviation === 'string' && category.abbreviation.toUpperCase() === payload.printing.code.toUpperCase()) {
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
                read('cache/setCodeMap.json', true)
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
            if (typeof setCodeMap[payload.printing.code.toUpperCase()] === 'string') {
              console.log(`Found category ID in set code map: ${setCodeMap[payload.printing.code.toUpperCase()]}`);
              console.groupEnd();
              console.groupEnd();
              found = true;
              resolveID(setCodeMap[payload.printing.code.toUpperCase()]);
            } else {
              console.group(`No match in set code map. Attempting to search by name "${payload.printing.name}"`);
              console.log(`Resolving ${payload.printing.tcgp}`);
              request(
                // This makes sure we get the same name TCGPlayer uses
                payload.printing.tcgp,
                (err, res, body) => {
                  if (err) {
                    // Fatal error - No options left
                    console.error(`Error resolving ${payload.printing.tcgp}: ${err}. Could not determine a category ID!`);
                    console.groupEnd();
                    console.groupEnd();
                    console.groupEnd();
                    rejectID(err);
                  } else {
                    const setName = res.request.path.replace(/^\/magic\/([a-z\-]+)\/.*$/, '$1').replace(/\-/g, ' ').toUpperCase();
                    console.log(`Determined set name: "${setName}". Searching in category list...`);
                    let found = false;
                    let id: number;
                    async.eachSeries(
                      categories,
                      (category: CategoryResult, nextCategory) => {
                        if (!found && category.name.replace(/[^a-zA-Z\s]/g, '').toUpperCase() === setName) {
                          found = true;
                          id = category.groupId;
                        }
                        nextCategory();
                      },
                      () => {
                        if (found) {
                          console.log(`Found category ID: ${id}. Writing changes to cache...`);
                          setCodeMap[payload.printing.code.toUpperCase()] = id;
                          fs.writeFile('cache/setCodeMap.json', JSON.stringify(setCodeMap), (err) => {
                            if (err) {
                              console.warn(`Error writing to set code map: ${err}`);
                            }
                            // Nonfatal error
                            console.groupEnd();
                            console.groupEnd();
                            console.groupEnd();
                            resolveID(id);
                          });
                        } else {
                          console.error(`No category ID could be determined for ${payload.printing.code} / ${setName}.`);
                          console.groupEnd();
                          console.groupEnd();
                          console.groupEnd();
                          // This message will be displayed in the error popup
                          rejectID(`No pricing information available for ${payload.printing.name}`);
                        }
                      },
                    );
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
          const skus = <SKUDictionary>await (() => {
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
          if (skus[id] && skus[id][payload.card.name] && skus[id][payload.card.condition]) {
            console.log(`Found SKU: ${skus[id][payload.card.name][payload.card.condition]}`);
            console.groupEnd();
            resolveSKU(skus[id][payload.card.name][payload.card.condition]);
          } else {
            console.group(`No SKU for ${payload.card.condition} "${payload.card.name}" in group ${id} found in cache. Requesting TCGPlayer...`);
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
                  console.error(`Could not get SKUs for "${payload.card.name}" in group ${id} from TCGPlayer: ${err}`);
                  console.groupEnd();
                  console.groupEnd();
                  rejectSKU(err);
                } else {
                  console.log(`Got SKU results for "${payload.card.name}" in group ${id} from TCGPlayer`);
                  const results: SKUSearchResults = JSON.parse(body);
                  // @TODO: Handle multiple results (is this possible?)
                  if (results.totalItems === 1) {
                    const conditions = results.results[0].productConditions;
                    let sku;
                    let foundCondition = false;
                    for (let i = 0; i < conditions.length; i += 1) {
                      if (conditions[i].name === payload.card.condition) {
                        sku = conditions[i].productConditionId;
                        foundCondition = true;
                        break;
                      }
                    }
                    if (foundCondition) {
                      console.log(`Determined SKU at ${payload.card.condition}: ${sku}`);
                      if (!skus[id]) {
                        skus[id] = {};
                      }
                      if (!skus[id][payload.card.name]) {
                        skus[id][payload.card.name] = {};
                      }
                      conditions.forEach((condition) => {
                        skus[id][payload.card.name][condition.name] = condition.productConditionId;
                      });
                      console.log('Writing new SKUs to cache...');
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
                    } else {
                      // Fatal error - No SKU can be determined
                      console.error(`Could not get SKU for "${payload.card.name}" in group ${id} from TCGPlayer: No SKU at ${payload.card.condition} exists!`);
                      console.groupEnd();
                      console.groupEnd();
                      rejectSKU(err);
                    }
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
