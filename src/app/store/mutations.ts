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
   */
  addTransaction(state: state, trade: Trade) {
    state.trades.push(trade);
  },
};
