import request from 'request';
import BecomesCard from '../../classes/interfaces/becomesCard';
import CategoryResult from '../../classes/interfaces/categoryResult';
import SKUSearchResults from '../../classes/interfaces/skuSearchResults';

/**
 * Gets the TCGPlayer SKU for the specified card
 * @returns {Promise<number>} A promise that will resolve with the SKU
 */
export default function fetchSKU({ state }, card: BecomesCard): Promise<number> {
  return new Promise(async (resolve, reject) => {
    let id;
    state.categories.forEach((category: CategoryResult) => {
      if (typeof category.abbreviation === 'string' && category.abbreviation.toUpperCase() === card.printing.toUpperCase()) {
        id = category.groupId;
      }
    });
    if (!id) {
      reject('No id');
    } else {
      request.get(
        {
          url: `http://api.tcgplayer.com/catalog/products?categoryId=1&groupId=${id}&productName=${encodeURIComponent(card.name)}`,
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
                // @TODO
                resolve(results.results[0].productConditions[0].productConditionId);
              } else {
                // @TODO
              }
            } catch (e) {
              reject(e);
            }
          }
        },
      );
    }
  });
}
