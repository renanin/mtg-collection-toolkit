import Vue from 'vue';
import Set from '../../classes/set';
import Card from '../../classes/card';
import SetPageComponent from './component';

export default {
  computed: {
    code() {
      return this.$route.params.code;
    },
  },
  data() {
    return {
      set: new Set(),
    };
  },
  created() {
    this.loadCards();
  },
  watch: {
    $route: 'loadCards',
  },
  methods: {
    loadCards() {
      this.$store.dispatch('loadCards', this.code);
    },
    getCards(): Card[] {
      return this.$store.state.sets[this.code].cards;
    },
  },
} as Vue.ComponentOptions<SetPageComponent>;
