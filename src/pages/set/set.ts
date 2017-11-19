import { ipcRenderer } from 'electron';
import Vue from 'vue';
import SimpleSort from 'simple-sort';
import Set from '../../classes/set';
import Collection from '../../classes/collection';
import SetComponent from './component';

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
      this.complete = Math.round(
        (this.collection.getCards().length / this.set.getCards().length) * 100);
      for (let i = 0; i < this.set.getCards().length; i += 1) {
        const equiv = this.collection.findCard(this.set.getCard(i).getName());
        this.set.setQuantity(i, equiv.getQuantity());
        this.set.setFoilQuantity(i, equiv.getFoilQuantity());
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
        cards = sorter.sortByPropAsc(this.set.getCards(), options.name);
      } else {
        cards = sorter.sortByPropDes(this.set.getCards(), options.name);
      }
      this.cardList = cards;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.setInfo[vm.$route.params.set]) {
        (vm as any).setData();
      } else {
        ipcRenderer.send('set', {
          code: this.$route.params.set,
          name: '',
        });
        ipcRenderer.on('set-result', () => {
          (vm as any).setData();
        });
      }
    });
  },
} as Vue.ComponentOptions<SetComponent>;
