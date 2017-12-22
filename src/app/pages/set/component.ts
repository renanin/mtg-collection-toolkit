import Vue from 'vue';
import Set from '../../classes/set';

export default interface SetPageComponent extends Vue {
  progress: number;
  fetchSet: Function;
  set: Set;
  loading: boolean;
  cardsLoaded: Function;
}
