import fs from 'fs';
import read from 'read-big-file';
import CategoryResult from '../../classes/interfaces/categoryResult';

/**
 * Fetches TCGPlayer category information from the cache or API
 * @returns {Promise<CategoryResult[]>} A promise that will resolve with the list of categories
 */
export default function fetchCategories({ dispatch, state }): Promise<CategoryResult[]> {
  return new Promise((resolve, reject) => {
    let categories: CategoryResult[];
    fs.stat('cache/categories.json', async (err) => {
      if (err) {
        console.error(err);
        categories = await dispatch('requestCategories');
      } else {
        console.log('Used categories from cache');
        categories = await read('cache/categories.json', true);
      }
      state.categories = categories;
      console.log(state.categories);
    });
  });
};
