import CardResult from '../classes/interfaces/scryfall/cardResult';
import Config from '../classes/interfaces/config';
import Trade from '../classes/trade';

export default interface state {
  cardInfo: {
    [id: string]: CardResult;
  };
  trades: Trade[];
  config: Config;
  accessToken: string;
}
