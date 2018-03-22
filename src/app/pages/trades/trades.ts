import { State } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})

/**
 * @class Trades
 * @classdesc A page for managing your trades and transactions
 * @extends Vue
 */
export default class Trades extends Vue {
  @State trades;
}
