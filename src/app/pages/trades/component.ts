import Vue from 'vue';
import Card from '../../classes/card';

export default interface TradesPageComponent extends Vue {
  myCards: Card[];
  theirCards: Card[];
}
