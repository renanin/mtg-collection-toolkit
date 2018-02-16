import Set from './set';

/**
 * @class SetMap
 * @classdesc A map of sets and cards
 */
export default interface SetMap {
  [code: string]: Set;
}
