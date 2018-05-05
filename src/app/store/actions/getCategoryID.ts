import request from 'request';
import PricePayload from '../../classes/interfaces/pricePayload';
import CategoryResult from '../../classes/interfaces/tcgplayer/categoryResult';

/**
 * Attempts to determine the TCGPlayer category ID from a Scryfall set code
 * @param {PricePayload} payload Information about the card and printing
 */
export default function ({ dispatch }, payload: PricePayload): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const categories = await dispatch('fetchCategories');
    let id;
    categories.forEach((category: CategoryResult) => {
      if (typeof category.abbreviation === 'string' && category.abbreviation.toUpperCase() === payload.printing.toUpperCase()) {
        id = category.groupId;
      }
    });
    if (!id) {
      console.log(`Attempting to automatically resolve category ID for ${payload.printing}...`);
      request(
        payload.card.purchase_uris.tcgplayer,
        (err, res, body) => {
          if (err) {
            console.error(err);
          } else {
            const setName = res.request.path.replace(/^\/magic\/([a-z\-]+)\/.*$/, '$1').replace(/\-/g, ' ').toUpperCase();
            categories.forEach((category: CategoryResult) => {
              if (category.name.replace(/[^a-zA-Z\s]/g, '').toUpperCase() === setName) {
                console.log('Automatically found category ID');
                id = category.groupId;
              }
            });
            if (id) {
              resolve(id);
            } else {
              reject(`No category matching '${payload.printing}' could be found!`);
            }
          }
        },
      );
    } else {
      resolve(id);
    }
  });
}
