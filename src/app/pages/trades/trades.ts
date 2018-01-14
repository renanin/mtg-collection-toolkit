import { ComponentOptions } from 'vue';
import request from 'request';
import TradesPageComponent from './component';
import Card from '../../classes/card';
import tradeList from '../../components/trade-list/trade-list.vue';
import Trade from '../../classes/trade';

export default {
  components: {
    tradeList,
  },
  data() {
    return {
      myCards: [],
      theirCards: [],
    };
  },
  methods: {
    addTrade() {
      (this.$refs.addTradeDialog as any).open();
    },
    submitTrade() {
      this.$store.commit('addTrade', new Trade(this.myCards, this.theirCards));
      (this.$refs.addTradeDialog as any).close();
      this.myCards = [];
      this.theirCards = [];
    },
  },
} as ComponentOptions<TradesPageComponent>;
