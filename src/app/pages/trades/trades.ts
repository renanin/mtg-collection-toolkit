import Component from 'vue-class-component';
import { Mutation, State } from 'vuex-class';
import Vue from 'vue';
import Trade from '../../classes/trade';

@Component({})

/**
 * @class Trades
 * @classdesc A page for managing your trades and transactions
 * @extends Vue
 */
export default class Trades extends Vue {
  @Mutation setActiveTrade;

  /**
   * A list of trades in the memory
   * @name Trades#trades
   * @type {Trade[]}
   */
  @State trades: Trade[];

  /**
   * Opens the edit interface for the selected trade
   * @param {number} key The index of the desired trade
   */
  edit(key: number) {
    this.setActiveTrade(key);
    this.$router.push('/trades/add');
  }
}
