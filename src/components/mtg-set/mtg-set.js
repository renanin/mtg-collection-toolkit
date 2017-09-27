export default {
  props: ['set'],
  computed: {
    complete() {
      // @TODO
      return 25;
    },
  },
  methods: {
    openSet() {
      this.$router.push(`set/${this.set.code}`);
    },
  },
};
