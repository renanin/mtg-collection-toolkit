import CardResult from '../classes/interfaces/cardResult';
import Trade from '../classes/trade';

export default interface state {
  cardInfo: {
    [id: string]: CardResult;
  };
  trades: Trade[];
  config: {
    useLatest: boolean;
    quickAdd: boolean;
  };
  activeTrade: number;
}
