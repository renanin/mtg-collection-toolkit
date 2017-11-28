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
  },
  data() {
    return {
      set: new Set(),
    };
  },
  created() {
    this.loadCards();
  },
  watch: {
    $route: 'loadCards',
  },
  methods: {
    loadCards() {
      // this.$store.dispatch('loadCards', this.code);
    },
    getCards(): Card[] {
      return this.$store.state.sets[this.code].cards;
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
  },
} as Vue.ComponentOptions<SetPageComponent>;
