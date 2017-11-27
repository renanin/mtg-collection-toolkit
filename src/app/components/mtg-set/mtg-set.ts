import Vue from 'vue';
import MTGSetComponent from './component';

export default {
  props: {
    name: String,
    icon: String,
    cardCount: Number,
    code: String,
  },
  computed: {
    progress(): number {
      // @TODO
      return 0;
    },
  },
  methods: {
    edit() {
      this.$router.push(`/set/${this.code}`);
    },
  },
} as Vue.ComponentOptions<MTGSetComponent>;
