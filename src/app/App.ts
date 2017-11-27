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
    paginate('https://api.scryfall.com/sets/').then((sets) => {
      sets.forEach((set) => {
        this.$store.commit('addSet', new Set(set.name, set.code, set.icon_svg_uri, set.card_count));
      });
    }).catch((e) => {
      console.error(e);
    });
  },
} as Vue.ComponentOptions<AppComponent>;
