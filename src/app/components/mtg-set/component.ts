import Vue from 'vue';
import Set from '../../classes/set';

export default interface MTGSetComponent extends Vue {
  progress: number;
  set: Set;
  viewSet: Function;
}
