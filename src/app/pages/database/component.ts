import Vue from 'vue';
import { Store } from 'vuex';
import state from '../../store/state';

export default interface DatabasePageComponent extends Vue {
  loading: boolean;
  $store: Store<state>;
}
