import electron from 'electron';
import SimpleSort from 'simple-sort';
import Set from '../../classes/set';
import Collection from '../../classes/collection';

const { ipcRenderer } = electron;

export default {
  data() {
    return {
      set: new Set(),
      complete: 0,
      collection: new Collection(),
      cardList: [],
    };
  },
  methods: {
    setData() {
      this.set = this.$store.state.setInfo[this.$route.params.set];
      this.collection = this.$store.state.collection.sets[this.$route.params.set];
      this.complete = Math.round((this.collection.cards.length / this.set.cards.length) * 100);
      for (let i = 0; i < this.set.cards.length; i += 1) {
        const equiv = this.collection.findCard(this.set.cards[i].name);
        this.set.cards[i].quantity = equiv.quantity;
        this.set.cards[i].foilQuantity = equiv.foilQuantity;
      }
      this.onSort({
        name: 'name',
        type: 'asc',
      });
    },
    onSort(options) {
      const sorter = new SimpleSort('en');
      let cards;
      if (options.type === 'asc') {
        cards = sorter.sortByPropAsc(this.set.cards, options.name);
      } else {
        cards = sorter.sortByPropDes(this.set.cards, options.name);
      }
      this.cardList = cards;
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
