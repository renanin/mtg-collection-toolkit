import Vue from 'vue';
import Card from '../../classes/card';

interface SearchResults {
  cards: Card[];
}

export default interface CollectionComponent extends Vue {
  reset: Function;
  searching: boolean;
  newCard: Card;
  results: SearchResults;
  selected: Card;
  showResults: boolean;
  fromCache: boolean;
}
