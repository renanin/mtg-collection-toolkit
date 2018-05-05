import CardResult from './scryfall/cardResult';

/**
 * @interface PricePayload
 * @desc Payload for fetchPrice and fetchSKU
 */
export default interface PricePayload {
  card: CardResult;
  printing: string;
}
