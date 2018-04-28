import CardResult from '../classes/interfaces/cardResult';
import CategoryResult from '../classes/interfaces/categoryResult';
import Config from '../classes/interfaces/config';
import Trade from '../classes/trade';

export default interface state {
  cardInfo: {
    [id: string]: CardResult;
  };
  trades: Trade[];
  config: Config;
  activeTrade: number;
  accessToken: string;
}
