import Vue from 'vue';
import Vuex from 'vuex';
import Collection from '../classes/collection';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collection: new Collection(),
    setInfo: {},
  },
  mutations,
});
