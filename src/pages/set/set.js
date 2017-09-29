import electron from 'electron';
import Set from '../../classes/set';
import Collection from '../../classes/collection';

const { ipcRenderer } = electron;

export default {
  data() {
    return {
      set: new Set(),
      complete: 0,
      collection: new Collection(),
    };
  },
  methods: {
    setData() {
      this.set = this.$store.state.setInfo[this.$route.params.set];
      this.collection = this.$store.state.collection.sets[this.$route.params.set];
      this.complete = Math.round((this.collection.cards.length / this.set.cards.length) * 100);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.setInfo[vm.$route.params.set]) {
        vm.setData();
      } else {
        ipcRenderer.send('set', {
          code: this.$route.params.set,
          name: '',
        });
        ipcRenderer.on('set-result', () => {
          vm.setData();
        });
      }
    });
  },
};
