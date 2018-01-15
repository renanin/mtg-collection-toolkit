/**
 * @class APIResponse
 * @classdesc A generic response from the Scryfall API
 */
export default interface APIResponse {
  /**
   * Indicates whether there is more information available,
   * since the API returns 175 items at a time.
   * @name APIResponse#has_more
   * @type {boolean}
   */
  has_more: boolean;
  /**
   * The URL of the next page of results, if any.
   * @name APIResponse#next_page
   * @type {string}
   */
  next_page?: string;
  /**
   * The items returned by the API
   * @name APIResponse#data
   * @type {any[]}
   */
  data: any[];
}
