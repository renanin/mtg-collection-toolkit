import { ComponentOptions } from 'vue';
import MTGSetComponent from './component';

export default {
  props: ['set'],
  computed: {
    progress(): number {
      return (this.set.uniqueCount() / this.set.getCardCount()) * 100;
    },
  },
  methods: {
    edit() {
      this.$router.push(`/set/${this.set.getCode()}`);
    },
  },
} as ComponentOptions<MTGSetComponent>;
