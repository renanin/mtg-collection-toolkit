import CardResult from './cardResult';

/**
 * @interface PrintingsResults
 * @desc Scryfall printing search results
 */
export default interface PrintingsResults {
  object: string;
  total_cards: number;
  has_more: boolean;
  data: CardResult[];
}
