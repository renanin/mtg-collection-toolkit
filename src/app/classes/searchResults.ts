import CardResult from './cardResult';

/**
 * @interface SearchResults
 * @desc Scryfall card search results
 */
export default interface SearchResults {
  object: string;
  total_cards: number;
  has_more: boolean;
  data: CardResult[];
}
