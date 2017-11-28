import Vue from 'vue';
import router from '../bootstrap';
import store from './store';
import AppComponent from './component';
import paginate from './util/paginate';
import Set from './classes/set';

export default {
  router,
  store,
  mounted() {
    this.$store.dispatch('loadSets');
  },
} as Vue.ComponentOptions<AppComponent>;
