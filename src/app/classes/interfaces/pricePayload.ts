import BecomesCard from './becomesCard';
import Printing from './printing';

/**
 * @interface PricePayload
 * @desc Payload for fetchPrice and fetchSKU
 */
export default interface PricePayload {
  card: BecomesCard;
  printing: Printing;
}
