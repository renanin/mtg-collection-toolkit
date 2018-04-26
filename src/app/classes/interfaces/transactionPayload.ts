import Trade from '../trade';

/**
 * @interface TransactionPayload
 * @desc Describes the payload to setTransaction
 */
export default interface TransactionPayload {
  index: number;
  trade: Trade;
}
