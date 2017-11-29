import Vue from 'vue';
import CollectionPageComponent from './component';
import mtgSet from '../../components/mtg-set/mtg-set.vue';

export default {
  components: {
    mtgSet,
  },
  computed: {
    uniqueTotal() {
      let total = 0;
      Object.keys(this.$store.state.sets).forEach((set) => {
        total += this.$store.state.sets[set].getCardCount();
      });
      return total;
    },
    unique() {
      let unique = 0;
      Object.keys(this.$store.state.sets).forEach((set) => {
        unique += this.$store.state.sets[set].uniqueCount();
      });
      return unique;
    },
    total() {
      let total = 0;
      Object.keys(this.$store.state.sets).forEach((set) => {
        total += this.$store.state.sets[set].totalCount();
      });
      return total;
    },
    totalPrice() {
      let total = 0;
      Object.keys(this.$store.state.sets).forEach((set) => {
        total += this.$store.state.sets[set].totalPrice();
      });
      return total;
    },
    progress() {
      return (this.unique / this.uniqueTotal) * 100;
    },
  },
  methods: {
    requestSets() {
      this.$store.dispatch('requestSets');
    },
  },
} as Vue.ComponentOptions<CollectionPageComponent>;
