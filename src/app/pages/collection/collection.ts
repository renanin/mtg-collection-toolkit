import Vue from 'vue';
import CollectionPageComponent from './component';
import mtgSet from '../../components/mtg-set/mtg-set.vue';

export default {
  components: {
    mtgSet,
  },
  methods: {
    requestSets() {
      this.$store.dispatch('requestSets');
    },
  },
} as Vue.ComponentOptions<CollectionPageComponent>;
