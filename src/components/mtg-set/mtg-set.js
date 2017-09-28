import bus from '../../bus';

export default {
  props: ['set'],
  methods: {
    openSet() {
      this.$router.push(`set/${this.set.code}`);
    },
    setInfo() {
      return this.$store.state.setInfo[this.set.code];
    },
    complete() {
      return Math.round((this.set.cards.length / this.setInfo().cards.length) * 100);
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
};
