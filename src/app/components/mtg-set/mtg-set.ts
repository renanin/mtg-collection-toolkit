import { ComponentOptions } from 'vue';
import MTGSetComponent from './component';

export default {
  props: ['set'],
  computed: {
    progress() {
      return 0;
    },
  },
  methods: {
    viewSet() {
      this.$router.push(`/set/${this.set.getCode()}`);
    },
  },
} as ComponentOptions<MTGSetComponent>;
