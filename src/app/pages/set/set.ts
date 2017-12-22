import { ComponentOptions } from 'vue';
import SetPageComponent from './component';
import bus from '../../../bus';
import save from '../../util/save';
import Card from '../../classes/card';

export default {
  data() {
    return {
      loading: true,
      selected: new Card('', '', 0),
      myUnique: 0,
      myTotal: 0,
      myCashUnique: 0,
      myCashTotal: 0,
      cashMax: 0,
      cashToComplete: 0,
      progress: 0,
    };
  },
  computed: {
    set() {
      return this.$store.state.sets[this.$route.params.code];
    },
  },
  created() {
    this.fetchSet();
    bus.$on('cardsLoaded', this.cardsLoaded);
  },
  watch: {
    $route: 'fetchSet',
  },
  methods: {
    fetchSet() {
      if (
        this.$store.state.sets[this.$route.params.code].getCards().length
        === this.$store.state.sets[this.$route.params.code].getCardCount()
      ) {
        console.log('Cards present in memory');
        this.loading = false;
        this.updateCounts();
      } else {
        this.$store.dispatch('fetchCards', this.$route.params.code);
      }
    },
    cardsLoaded() {
      this.loading = false;
      this.updateCounts();
    },
    save() {
      save(
        this.$store.state.sets[this.$route.params.code],
        this.$store.state.collection,
      ).then(() => {
        bus.$emit('notify', 'Set saved');
      }).catch((e) => {
        bus.$emit('notify', `Could not save set: ${e}`);
      });
    },
    select(card: Card) {
      this.selected = card;
    },
    setQuantity(quantity: number) {
      this.$store.commit('setQuantity', {
        quantity,
        set: this.$route.params.code,
        id: this.selected.getID(),
      });
      this.updateCounts();
    },
    updateCounts() {
      let unique = 0;
      let total = 0;
      let cashUnique = 0;
      let cashTotal = 0;
      let cashMax = 0;
      this.set.getCards().forEach((card: Card) => {
        if (card.getQuantity() > 0) {
          unique += 1;
          total += card.getQuantity();
          cashUnique += card.getPrice();
          cashTotal += (card.getPrice() * card.getQuantity());
        }
        cashMax += card.getPrice();
      });
      this.myUnique = unique;
      this.myTotal = total;
      this.myCashUnique = cashUnique;
      this.myCashTotal = cashTotal;
      this.cashMax = cashMax;
      this.progress = (unique / this.set.getCardCount()) * 100;
      this.cashToComplete = cashMax - cashUnique;
    },
  },
} as ComponentOptions<SetPageComponent>;
