import Vue from 'vue';
import Set from '../../classes/set';

export default interface SetPageComponent extends Vue {
  loadCards: Function;
  code: string;
  set: Set;
}
