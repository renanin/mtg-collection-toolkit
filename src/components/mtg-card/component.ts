import Vue from 'vue';
import Card from '../../classes/card';

export default interface MTGCardComponent extends Vue {
  card: Card;
}
