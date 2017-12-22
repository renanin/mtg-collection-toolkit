import Vue from 'vue';
import Set from '../../classes/set';
import Card from '../../classes/card';

export default interface SetPageComponent extends Vue {
  progress: number;
  myUnique: number;
  myTotal: number;
  myCashUnique: number;
  myCashTotal: number;
  cashMax: number;
  cashToComplete: number;
  loading: boolean;
  set: Set;
  selected: Card;
  fetchSet();
  cardsLoaded();
  save();
  updateCounts();
}
