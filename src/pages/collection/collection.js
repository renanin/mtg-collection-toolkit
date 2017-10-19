import electron from 'electron';
import Card from '../../classes/card';
import mtgCard from '../../components/mtg-card/mtg-card.vue';
import mtgSet from '../../components/mtg-set/mtg-set.vue';
import bus from '../../bus';

const { ipcRenderer } = electron;

export default {
  components: {
    mtgCard,
    mtgSet,
  },
  data() {
    return {
      newCard: new Card(),
      showResults: false,
      results: [],
      fromCache: false,
      selected: new Card(),
      searching: false,
    };
  },
  methods: {
    openSearchDialog() {
      this.$refs.searchDialog.open();
    },
    cancel() {
      this.$refs.searchDialog.close();
      this.$refs.addDialog.close();
      this.reset();
    },
    search() {
      this.searching = true;
      ipcRenderer.send('search', this.newCard.name);
    },
    add(index) {
      const selected = this.results[index];
      this.selected = new Card(selected.name, selected.set, selected.setName, selected.multiverseid);
      this.$refs.searchDialog.close();
      this.$refs.addDialog.open();
    },
    reset() {
      this.newCard = new Card();
      this.showResults = false;
      this.results = [];
      this.fromCache = false;
      this.selected = new Card();
    },
    updateCache() {
      // @TODO
    },
    addCard() {
      ipcRenderer.send('set', {
        code: this.selected.set,
        name: this.selected.setName,
      });
      this.searching = true;
    },
    saveCollection() {
      console.log(this.$store.state.collection);
      ipcRenderer.send('save-collection', JSON.stringify(this.$store.state.collection));
    },
  },
  mounted() {
    ipcRenderer.on('search-result', (event, results) => {
      this.searching = false;
      this.results = results.cards;
      this.showResults = true;
      this.fromCache = results.fromCache;
    });
    ipcRenderer.on('set-result', (event, results) => {
      this.$store.commit('loadSet', results);
      this.searching = false;
      this.$store.commit('addCard', this.selected);
      this.$refs.addDialog.close();
      this.reset();
    });
    ipcRenderer.on('collection-saved', () => {
      console.log('Collection saved');
    });
  },
};
