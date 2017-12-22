import Card from './card';

export default interface Collection {
  [set: string]: {
    [id: string]: number;
  };
}
