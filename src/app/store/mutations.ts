import CardResult from '../classes/interfaces/scryfall/cardResult';
import Trade from '../classes/trade';
import TransactionPayload from '../classes/interfaces/transactionPayload';
import state from './state';

export default {
  /**
   * Sets up a link between a card ID and card info
   * @param {state} state The Vuex state
   * @param {CardResult} card The card
   */
  linkCardInfo(state: state, card: CardResult) {
    state.cardInfo[card.id] = card;
  },
  /**
   * Adds a transaction to the state
   * @param {state} state The Vuex state
   * @param {Trade} trade The new trade
   */
  addTransaction(state: state, trade: Trade) {
    state.trades.push(trade);
  },
  /**
   * Updates information about the specified transaction
   * @param {state} state The Vuex state
   * @param {TransactionPayload} payload The index in state.trades & the new trade object
   */
  setTransaction(state: state, payload: TransactionPayload) {
    state.trades[payload.index] = payload.trade;
  },
  /**
   * Sets the TCGPlayer access token for the session
   * @param {state} state The Vuex state
   * @param {string} token The access token
   */
  setAccessToken(state: state, token: string) {
    state.accessToken = token;
  },
};
