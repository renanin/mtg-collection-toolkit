import Vue from 'vue';
import Set from '../../classes/set';

export default interface MTGSetComponent extends Vue {
  set: Set;
  progress: number;
  edit: Function;
}
