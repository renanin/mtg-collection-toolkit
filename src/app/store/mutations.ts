import CardResult from '../classes/interfaces/cardResult';
import state from './state';

export default {
  linkCardInfo(state: state, card: CardResult) {
    state.cardInfo[card.id] = card;
  },
};
