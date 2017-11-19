import Vue from 'vue';
import Set from '../../classes/set';
import Card from '../../classes/card';
import Collection from '../../classes/collection';

export default interface SetPageComponent extends Vue {
  set: Set;
  collection: Set;
  complete: number;
  onSort: Function;
  cardList: Card[];
}
