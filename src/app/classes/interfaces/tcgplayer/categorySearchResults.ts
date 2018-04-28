import CategoryResult from './categoryResult';

/**
 * @interface CategorySearchResults
 * @desc TCGPlayer category list response
 */
export default interface CategorySearchResults {
  totalItems: number;
  success: boolean;
  errors: string[];
  results: CategoryResult[];
}
