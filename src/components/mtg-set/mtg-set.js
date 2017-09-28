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
  },
  mounted() {
    bus.$on('update', () => {
      this.$forceUpdate();
    });
  },
};
