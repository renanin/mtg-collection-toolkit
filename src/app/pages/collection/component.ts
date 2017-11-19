import Vue from 'vue';
import Card from '../../classes/card';
import SearchResult from '../../classes/searchResult';

export default interface CollectionPageComponent extends Vue {
  reset: Function;
  searching: boolean;
  newCard: Card;
  results: SearchResult[];
  selected: Card;
  showResults: boolean;
  fromCache: boolean;
}
