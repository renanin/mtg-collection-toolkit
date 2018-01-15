import Set from '../classes/set';

export default interface state {
  sets: {
    [code: string]: Set;
  };
}
