/**
 * @interface AutocompleteResults
 * @desc Results from the Scryfall autocomplete API
 */
export default interface AutocompleteResults {
  object: string;
  total_items: number;
  data: string[];
}
