import fs from 'fs';
import request from 'request';
import SKURequestPayload from '../../classes/interfaces/skuRequestPayload';
import SKUSearchResults from '../../classes/interfaces/skuSearchResults';

/**
 * Requests SKU information from TCGPlayer & caches it
 * @param {SKURequestPayload} payload A payload with the group ID and name
 * @returns {Promise<number>} A promise that resolves with the SKU
 */
export default function requestSKU({ state }, payload: SKURequestPayload): Promise<number> {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `http://api.tcgplayer.com/catalog/products?categoryId=1&groupId=${payload.groupId}&productName=${encodeURIComponent(payload.name)}`,
        auth: {
          bearer: state.accessToken,
        },
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          try {
            const results: SKUSearchResults = JSON.parse(body);
            if (results.totalItems === 1) {
              fs.writeFile('cache/skus.json', JSON.stringify(results), (err) => {
                if (err) {
                  // @TODO
                  console.error(err);
                }
                // @TODO
                resolve(results.results[0].productConditions[0].productConditionId);
              });
            } else {
              // @TODO
            }
          } catch (e) {
            reject(e);
          }
        }
      },
    );
  });
}
