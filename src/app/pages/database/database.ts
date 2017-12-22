import { ComponentOptions } from 'vue';
import DatabasePageComponent from './component';
import bus from '../../../bus';

export default {
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.fetchSets();
    bus.$on('setsLoaded', this.setsLoaded);
  },
  watch: {
    $route: 'fetchSets',
  },
  methods: {
    fetchSets() {
      this.$store.dispatch('fetchSets');
    },
    setsLoaded() {
      this.loading = false;
    },
  },
} as ComponentOptions<DatabasePageComponent>;
