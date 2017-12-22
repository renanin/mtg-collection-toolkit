import { ComponentOptions } from 'vue';
import DatabasePageComponent from './component';
import bus from '../../../bus';
import mtgSet from '../../components/mtg-set/mtg-set.vue';

export default {
  components: {
    mtgSet,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    sets() {
      return this.$store.state.sets;
    },
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
      if (Object.keys(this.$store.state.sets).length === 0) {
        this.$store.dispatch('fetchSets');
      } else {
        console.log('Sets present in memory');
        this.loading = false;
      }
    },
    setsLoaded() {
      this.loading = false;
    },
  },
} as ComponentOptions<DatabasePageComponent>;
