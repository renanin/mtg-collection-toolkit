import { ComponentOptions } from 'vue';
import SetPageComponent from './component';
import bus from '../../../bus';

export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    progress() {
      return 0;
    },
    set() {
      return this.$store.state.sets[this.$route.params.code];
    },
  },
  created() {
    this.fetchSet();
    bus.$on('cardsLoaded', this.cardsLoaded);
  },
  watch: {
    $route: 'fetchSet',
  },
  methods: {
    fetchSet() {
      if (
        this.$store.state.sets[this.$route.params.code].getCards().length
        === this.$store.state.sets[this.$route.params.code].getCardCount()
      ) {
        console.log('Cards present in memory');
        this.loading = false; 
      } else {
        this.$store.dispatch('fetchSet', this.$route.params.code);
      }
    },
    cardsLoaded() {
      this.loading = false;
    },
  },
} as ComponentOptions<SetPageComponent>;
