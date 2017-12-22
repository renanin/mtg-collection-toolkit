import { ComponentOptions } from 'vue';
import MTGSetComponent from './component';

export default {
  props: ['set'],
  computed: {
    progress() {
      let count = 0;
      if (this.$store.state.collection[this.set.getCode()]) {
        count = Object.keys(this.$store.state.collection[this.set.getCode()]).length;
      }
      return (count / this.set.getCardCount()) * 100;
    },
  },
  methods: {
    viewSet() {
      this.$router.push(`/set/${this.set.getCode()}`);
    },
  },
} as ComponentOptions<MTGSetComponent>;
