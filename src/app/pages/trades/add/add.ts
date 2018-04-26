import Component from 'vue-class-component';
import { Mutation, State } from 'vuex-class';
import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import Leg from '../../../components/leg/leg.vue';
import Trade from '../../../classes/trade';
import TransactionPayload from '../../../classes/interfaces/transactionPayload';

@Component({
  components: {
    Leg,
  },
})

/**
 * @class Add
 * @classdesc Page for adding a trade
 * @extends Vue
 * @see Trade
 */
export default class Add extends Vue {
  /**
   * Adds a transaction to the state
   * @param {Trade} trade The new trade
   */
  @Mutation addTransaction: (trade: Trade) => void;

  /**
   * Sets the specified index for editing
   * @param {number} index The index of the trade
   */
  @Mutation setActiveTrade: (index: number) => void;

  /**
   * Updates information about the specified transaction
   * @param {TransactionPayload} payload The index in state.trades & the new trade object
   */
  @Mutation setTransaction: (payload: TransactionPayload) => void;

  /**
   * The index of the trade being edited
   * @name Add#activeTrade
   * @type {number}
   */
  @State activeTrade: number;

  /**
   * Wrapper for activeTrade to work with Watch
   * @name Add#index
   * @type {number}
   * @private
   */
  private get index(): number {
    return this.activeTrade;
  }

  /**
   * A list of trades in the memory
   * @name Add#trades
   * @type {Trade[]}
   */
  @State trades: Trade[];

  /**
   * The trade being created
   * @name Add#trade
   * @type {Trade}
   * @private
   */
  private trade: Trade = new Trade(2);

  /**
   * The state of the back dialog
   * @name Add#backDialog
   * @type {boolean}
   * @private
   */
  private backDialog: boolean = false;

  /**
   * Saves the transaction to the memory
   */
  save() {
    this.setTransaction({
      index: this.index,
      trade: this.trade,
    });
    this.$router.push('/trades');
    this.setActiveTrade(-1);
  }

  mounted() {
    this.updateTrade();
  }

  /**
   * Coordinates the local state with the global state
   */
  @Watch('index')
  updateTrade() {
    if (this.index < 0) {
      this.addTransaction(new Trade(2));
      this.setActiveTrade(this.trades.length - 1);
    } else {
      this.trade = this.trades[this.index];
    }
  }
}
