import Set from '../classes/set';

export default interface state {
  sets: {
    [key: string]: Set;
  };
}
