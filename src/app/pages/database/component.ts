import Vue from 'vue';
import { Store } from 'vuex';
import state from '../../store/state';
import SetsObject from '../../classes/setsObject';

export default interface DatabasePageComponent extends Vue {
  loading: boolean;
  $store: Store<state>;
  fetchSets: Function;
  setsLoaded: Function;
  sets: SetsObject;
}
