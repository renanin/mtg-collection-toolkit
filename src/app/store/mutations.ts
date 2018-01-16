import Set from '../classes/set';
import SetResponse from '../classes/setResponse';
import state from './state';

export default {
  loadSets(state: state, obj: SetResponse[]) {
    obj.forEach((set) => {
      // Ignore digital sets
      if (!set.digital) {
        state.sets[set.code] = new Set(set.code, set.name, set.card_count, set.block_code, set.block, set.icon_svg_uri, set.parent_set_code);
      }
    });
  },
};
