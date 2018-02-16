import Collection from '../classes/collection';
import Set from '../classes/set';
import SetResponse from '../classes/response/set';
import state from './state';

export default {
  /**
   * Sets/overrides the active collection
   * @prop {state} state The Vuex state
   * @prop {Collection} collection The collection to set
   */
  setCollection(state: state, collection: Collection) {
    state.collection = collection;
  },
  /**
   * Adds a set into the memory
   * @prop {state} state The Vuex state
   * @prop {SetResponse} set The set response
   */
  addSet(state: state, set: SetResponse) {
    state.sets[set.code] = new Set(set.code, set.name, set.icon_svg_uri);
  }
};
