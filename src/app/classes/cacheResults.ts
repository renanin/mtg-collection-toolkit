import Card from './card';

export default interface CacheResults {
  fromCache: boolean;
  code: string;
  name: string;
  cards: Card[];
}
