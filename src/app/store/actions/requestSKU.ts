import fs from 'fs';
import read from 'read-big-file';
import request from 'request';
import SKUDictionary from '../../classes/interfaces/skuDictionary';
import SKURequestPayload from '../../classes/interfaces/skuRequestPayload';
import SKUSearchResults from '../../classes/interfaces/tcgplayer/skuSearchResults';

/**
 * Requests SKU information from TCGPlayer & caches it
 * @param {SKURequestPayload} payload A payload with the group ID and name
 * @returns {Promise<number>} A promise that resolves with the SKU
 */
export default function requestSKU({ state }, payload: SKURequestPayload): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const fromCache = <SKUDictionary>await (
      () => new Promise(
        (resolveSKUs) => {
          console.log('Attempting to read SKUs from cache...');
          read('cache/skus.json', true)
            .then((skus) => {
              resolveSKUs(skus);
            })
            .catch((err) => {
              console.warn(`Error reading cache/skus.json: ${err}`);
              resolveSKUs({});
            });
        },
      )
    )();
    if (fromCache[payload.groupId] && fromCache[payload.groupId][payload.name]) {
      console.log('Using SKU from cache');
      resolve(fromCache[payload.groupId][payload.name]);
    } else {
      console.log('SKU not found in cache. Requesting TCGPlayer...');
      request.get(
        {
          url: `http://api.tcgplayer.com/catalog/products?categoryId=1&groupId=${payload.groupId}&productName=${encodeURIComponent(payload.name)}`,
          auth: {
            bearer: state.accessToken,
          },
        },
        (err, res, body) => {
          if (err) {
            // Fatal error: No SKU can be retrieved
            console.error(`Error requesting SKU: ${err}`);
            reject(err);
          } else {
            const results: SKUSearchResults = JSON.parse(body);
            // @TODO: Handle multiple results (is this possible?)
            if (results.totalItems === 1) {
              // @TODO: Different conditions (picks near mint automatically)
              const sku = results.results[0].productConditions[0].productConditionId;
              if (!fromCache[payload.groupId]) {
                fromCache[payload.groupId] = {};
              }
              fromCache[payload.groupId][payload.name] = sku;
              console.log('Writing new SKU to cache...');
              fs.writeFile(
                'cache/skus.json',
                JSON.stringify(fromCache),
                (err) => {
                  if (err) {
                    console.warn(`Error writing to cache: ${err}`);
                  }
                  // Nonfatal error, we can still resolve the SKU
                  console.log('Success');
                  resolve(sku);
                },
              );
            }
          }
        },
      );
    }
  });
}
