import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations,
  actions,
  state: {
    cardInfo: {},
    trades: [],
    config: {
      autoFetchPrice: true,
    },
  },
}) as Store<state>;
