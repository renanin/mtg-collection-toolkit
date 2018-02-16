import Card from '../classes/card';
import Trade from '../classes/trade';
import state from './state';

export default {
  /**
   * Adds a card into the memory
   * @param {state} state The Vuex state
   * @param {Card} card The card to add
   */
  addCard(state: state, card: Card) {
    state.cards.push(card);
  },
  /**
   * Adds a trade into the memory
   * @param {state} state The Vuex state
   * @param {Trade} trade The trade
   */
  addTrade(state: state, trade: Trade) {
    state.trades.push(trade);
  }
};
