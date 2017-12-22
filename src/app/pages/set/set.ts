import { ComponentOptions } from 'vue';
import SetPageComponent from './component';
import bus from '../../../bus';
import save from '../../util/save';

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
        this.$store.dispatch('fetchCards', this.$route.params.code);
      }
    },
    cardsLoaded() {
      this.loading = false;
    },
    save() {
      save(
        this.$store.state.sets[this.$route.params.code],
        this.$store.state.collection,
      ).then(() => {
        bus.$emit('notify', 'Set saved');
      }).catch((e) => {
        bus.$emit('notify', `Could not save set: ${e}`);
      });
    },
  },
} as ComponentOptions<SetPageComponent>;
