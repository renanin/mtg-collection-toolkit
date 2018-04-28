import fs from 'fs';
import read from 'read-big-file';
import request from 'request';
import BecomesCard from '../../classes/interfaces/becomesCard';
import CategoryResult from '../../classes/interfaces/tcgplayer/categoryResult';
import PricePayload from '../../classes/interfaces/pricePayload';
import SKUDictionary from '../../classes/interfaces/skuDictionary';
import SKUSearchResults from '../../classes/interfaces/tcgplayer/skuSearchResults';

/**
 * Gets the TCGPlayer SKU for the specified card
 * @returns {Promise<number>} A promise that will resolve with the SKU
 */
export default function fetchSKU({ dispatch, state }, payload: PricePayload): Promise<number> {
  return new Promise(async (resolve, reject) => {
    let id;
    const categories = await dispatch('fetchCategories');
    categories.forEach((category: CategoryResult) => {
      if (typeof category.abbreviation === 'string' && category.abbreviation.toUpperCase() === payload.printing.toUpperCase()) {
        id = category.groupId;
      }
    });
    if (!id) {
      reject('No id');
    } else {
      let sku: number;
      fs.stat('cache/skus.json', async (err) => {
        if (err) {
          console.error(err);
          sku = await dispatch('requestSKU', {
            groupId: id,
            name: payload.name,
          });
        } else {
          const skus: SKUDictionary = await read('cache/skus.json', true);
          let found = false;
          if (skus[id]) {
            if (skus[id][payload.name]) {
              sku = skus[id][payload.name];
              found = true;
            }
          }
          if (!found) {
            sku = await dispatch('requestSKU', {
              groupId: id,
              name: payload.name,
            });
          }
        }
        resolve(sku);
      });
    }
  });
}
