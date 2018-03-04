import CardResult from '../classes/interfaces/cardResult';

export default interface state {
  cardInfo: {
    [id: string]: CardResult;
  };
}
