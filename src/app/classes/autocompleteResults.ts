/**
 * @interface AutocompleteResults
 * @desc Autocomplete results from Scryfall
 */
export default interface AutocompleteResults {
  object: string;
  total_items: number;
  data: string[];
}
