import CardResult from '../classes/interfaces/cardResult';
import Trade from '../classes/trade';
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
   * Sets the specified index for editing
   * @param {state} state The Vuex state
   * @param {number} index The index of the trade
   */
  setActiveTrade(state: state, index: number) {
    state.activeTrade = index;
  },
  /**
   * Updates information about the specified transaction
   * @param {state} state The Vuex state
   * @param {Object} payload The index in state.trades & the new trade object
   */
  setTransaction(state: state, payload: {
    index: number,
    trade: Trade,
  }) {
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
