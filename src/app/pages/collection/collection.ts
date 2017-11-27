import Vue from 'vue';
import request from 'request';
import CollectionPageComponent from './component';
import mtgSet from '../../components/mtg-set/mtg-set.vue';
import paginate from '../../util/paginate';
import Set from '../../classes/set';

export default {
  components: {
    mtgSet,
  },
  data() {
    return {
      sets: [],
    };
  },
  mounted() {
    paginate('https://api.scryfall.com/sets/').then((sets) => {
      sets.forEach((set) => {
        this.sets.push(new Set(set.name, set.code, set.icon_svg_uri));
      });
    }).catch((e) => {
      console.error(e);
    });
  },
} as Vue.ComponentOptions<CollectionPageComponent>;
