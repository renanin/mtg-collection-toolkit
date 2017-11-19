import Vue from 'vue';
import MTGSetComponent from './component';
import bus from '../../bus';

export default {
  props: ['set'],
  methods: {
    openSet() {
      this.$router.push(`set/${this.set.getCode()}`);
    },
    setInfo() {
      return this.$store.state.setInfo[this.set.getCode()];
    },
    complete() {
      if (this.setInfo()) {
        return Math.round((this.set.getCards().length / this.setInfo().cards.length) * 100);
      }
      return 0;
    },
    cardMessage() {
      if (this.set.cardCount() === 1) {
        return `${this.set.cardCount()} card`;
      }
      return `${this.set.cardCount()} cards`;
    },
  },
  mounted() {
    bus.$on('update', () => {
      this.$forceUpdate();
    });
  },
} as Vue.ComponentOptions<MTGSetComponent>;
