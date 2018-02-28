/**
 * @interface AutocompleteResults
 * @desc Autocomplete results from the Scryfall API
 */
export default interface AutocompleteResults {
  object: 'catalog';
  total_items: number;
  data: string[];
}
