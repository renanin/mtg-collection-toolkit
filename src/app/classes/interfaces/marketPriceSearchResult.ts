/**
 * @interface MarketPriceSearchResult
 * @desc Market price search results from TCGPlayer
 */
export default interface MarketPriceSearchResult {
  errors: string[];
  success: boolean;
  results: {
    highestRange: number;
    lowestRange: number;
    price: number;
    productConditionId: number;
  }[];
}
