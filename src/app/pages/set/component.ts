import Vue from 'vue';
import Set from '../../classes/set';

export default interface SetPageComponent extends Vue {
  requestCards: Function;
  code: string;
  set: Set;
  updateSet: Function;
}
