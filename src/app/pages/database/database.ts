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
      this.$store.dispatch('fetchSets');
    },
    setsLoaded() {
      this.loading = false;
    },
  },
} as ComponentOptions<DatabasePageComponent>;
