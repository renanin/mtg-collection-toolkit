import Vue from 'vue';
import Vuex from 'vuex';
import Collection from '../classes/collection';
import mutations from './mutations';
import actions from './actions';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations,
  actions,
  state: {
    collection: new Collection(),
    setInfo: {},
  },
}) as Vuex.Store<state>;
