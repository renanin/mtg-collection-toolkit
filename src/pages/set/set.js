export default {
  computed: {
    set() {
      return this.$store.state.collection.sets[this.$route.params.set];
    },
  },
};
