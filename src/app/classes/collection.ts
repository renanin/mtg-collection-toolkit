import SetMap from './setMap';

/**
 * @class Collection
 * @classdesc Contains the user's collection
 */
export default class Collection {
  /**
   * The cards in the collection
   * @name Collection#content
   * @type {SetMap}
   */
  content: SetMap;

  /**
   * @constructs
   */
  constructor() {
    this.content = {};
  }
}
