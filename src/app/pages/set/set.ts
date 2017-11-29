import { remote } from 'electron';
import Vue from 'vue';
import fs from 'fs';
import Set from '../../classes/set';
import Card from '../../classes/card';
import SetPageComponent from './component';

export default {
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
    this.requestCards();
  },
  watch: {
    $route: 'requestCards',
  },
  methods: {
    getCards(): Card[] {
      return this.set.getCards();
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
  },
} as Vue.ComponentOptions<SetPageComponent>;
