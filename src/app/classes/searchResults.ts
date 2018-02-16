import CardResult from './cardResult';

/**
 * @interface SearchResults
 * @desc Scryfall printing search results
 */
export default interface SearchResults {
  object: string;
  total_cards: number;
  has_more: boolean;
  data: CardResult[];
}
