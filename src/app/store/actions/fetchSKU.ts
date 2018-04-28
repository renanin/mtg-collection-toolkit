import fs from 'fs';
import read from 'read-big-file';
import request from 'request';
import BecomesCard from '../../classes/interfaces/becomesCard';
import CategoryResult from '../../classes/interfaces/tcgplayer/categoryResult';
import SKUDictionary from '../../classes/interfaces/skuDictionary';
import SKUSearchResults from '../../classes/interfaces/tcgplayer/skuSearchResults';

/**
 * Gets the TCGPlayer SKU for the specified card
 * @returns {Promise<number>} A promise that will resolve with the SKU
 */
export default function fetchSKU({ dispatch, state }, card: BecomesCard): Promise<number> {
  return new Promise(async (resolve, reject) => {
    let id;
    const categories = await dispatch('fetchCategories');
    categories.forEach((category: CategoryResult) => {
      if (typeof category.abbreviation === 'string' && category.abbreviation.toUpperCase() === card.printing.toUpperCase()) {
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
            name: card.name,
          });
        } else {
          const skus: SKUDictionary = await read('cache/skus.json', true);
          sku = skus[id][card.name];
        }
        resolve(sku);
      });
    }
  });
}
