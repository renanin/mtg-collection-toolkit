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
      this.$store.dispatch('fetchSet', this.$route.params.code);
    },
    cardsLoaded() {
      this.loading = false;
    },
  },
} as ComponentOptions<SetPageComponent>;
