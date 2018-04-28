import Product from './product';

/**
 * @interface SKUSearchResults
 * @desc SKU search results from TCGPlayer
*/
export default interface SKUSearchResults {
  totalItems: number;
  success: boolean;
  errors: string[];
  results: Product[]; 
}
