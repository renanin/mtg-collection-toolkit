import CardResult from './cardResult';

/**
 * @interface CardSearchResult
 * @desc Card search results from Scryfall
 */
export default interface CardSearchResult {
  object: 'list';
  total_cards: number;
  has_more: boolean;
  data: CardResult[];
}
