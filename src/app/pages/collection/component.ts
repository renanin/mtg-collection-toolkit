import Vue from 'vue';
import Set from '../../classes/set';

export default interface CollectionPageComponent extends Vue {
  progress: number;
  total: number;
  uniqueTotal: number;
  unique: number;
  requestSets: Function;
}
