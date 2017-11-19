import Vue from 'vue';
import Card from '../../classes/card';

interface SearchResult {
  name: string;
  set: string;
  setName: string;
  multiverseid: number;
}

export default interface CollectionComponent extends Vue {
  reset: Function;
  searching: boolean;
  newCard: Card;
  results: SearchResult[];
  selected: Card;
  showResults: boolean;
  fromCache: boolean;
}
