import { remote } from 'electron';
import { ComponentOptions } from 'vue';
import fs from 'fs';
import Set from '../../classes/set';
import Card from '../../classes/card';
import SetPageComponent from './component';
import mtgCard from '../../components/mtg-card/mtg-card.vue';

export default {
  components: {
    mtgCard,
  },
  computed: {
    code() {
      return this.$route.params.code;
    },
    progress() {
      return (this.set.uniqueCount() / this.set.getCardCount()) * 100;
    },
  },
  data() {
    return {
      set: new Set(),
    };
  },
  created() {
    this.updateSet();
  },
  watch: {
    $route: 'updateSet',
  },
  methods: {
    getCards(): Card[] {
      return this.set.getCards();
    },
    save() {
      fs.writeFile(
        'userdata/collection.mtgcollection',
        JSON.stringify(this.$store.state.sets),
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Filed saved');
          }
        },
      );
    },
    requestCards() {
      this.$store.dispatch('loadCards', this.code);
      if (this.$store.state.sets[this.code]) {
        this.set = this.$store.state.sets[this.code];
      }
    },
    updateSet() {
      this.set = this.$store.state.sets[this.code];
    },
    hasCards() {
      return this.set.getCards().length > 0;
    },
    increment(index: number) {
      this.$store.commit('incrementQuantity', {
        index,
        set: this.code,
      });
    },
    decrement(index: number) {
      this.$store.commit('decrementQuantity', {
        index,
        set: this.code,
      });
    },
  },
} as ComponentOptions<SetPageComponent>;
