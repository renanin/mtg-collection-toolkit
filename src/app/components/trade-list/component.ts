import Vue from 'vue';
import Card from '../../classes/card';

export default interface TradeListComponent extends Vue {
  cards: Card[];
  value: Card[];
  editable: boolean;
  isEditable: boolean;
}
