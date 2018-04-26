import CardResult from '../classes/interfaces/cardResult';
import CategoryResult from '../classes/interfaces/categoryResult';
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
  accessToken: string;
  categories: CategoryResult[];
}
