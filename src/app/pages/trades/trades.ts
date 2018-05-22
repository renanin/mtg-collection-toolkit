import Component from 'vue-class-component';
import { Mutation, State } from 'vuex-class';
import Vue from 'vue';
import Leg from '../../components/leg/leg.vue';
import Trade from '../../classes/trade';
import TransactionPayload from '../../classes/interfaces/transactionPayload';

@Component({
  components: {
    Leg,
  },
})

/**
 * @class Trades
 * @classdesc A page for managing your trades and transactions
 * @extends Vue
 */
export default class Trades extends Vue {
  /**
   * Updates information about the specified transaction
   * @param {TransactionPayload} payload The index in state.trades & the new trade object
   */
  @Mutation setTransaction: (payload: TransactionPayload) => void;

  /**
   * Adds a transaction to the state
   * @param {Trade} trade The new trade
   */
  @Mutation addTransaction: (trade: Trade) => void;

  /**
   * A list of trades in the memory
   * @name Trades#trades
   * @type {Trade[]}
   */
  @State trades: Trade[];

  /**
   * Whether the edit dialog is open or not
   * @name Trades#showEditDialog
   * @type {boolean}
   * @private
   */
  private showEditDialog: boolean = false;

  /**
   * Whether the cancel confirmation dialog is open or not
   * @name Trades#showCancelDialog
   * @type {boolean}
   * @private
   */
  private showCancelDialog: boolean = false;

  /**
   * The trade currently being edited
   * @name Trades#activeTrade
   * @type {Trade}
   * @private
   */
  private activeTrade: Trade = new Trade(2);

  /**
   * The index of the trade currently being edited in the store
   * @name Trades#editIndex
   * @type {number}
   * @private
   */
  private editIndex: number;

  /**
   * Creates a new page and opens the edit interface
   */
  newTrade() {
    this.activeTrade = new Trade(2);
    this.editIndex = null;
    this.showEditDialog = true;
  }

  /**
   * Cancels & closes changes to the currently open trade
   */
  closeTrade() {
    this.activeTrade = new Trade(2);
    this.showCancelDialog = false;
    this.showEditDialog = false;
  }

  /**
   * Saves the currently open trade to the state
   */
  saveTrade() {
    if (typeof this.editIndex === 'number') {
      this.setTransaction({
        trade: this.activeTrade,
        index: this.editIndex,
      });
    } else {
      this.addTransaction(this.activeTrade);
    }
    this.closeTrade();
  }

  /**
   * Opens the edit interface for the selected trade
   * @param {number} key The index of the desired trade
   */
  edit(key: number) {
    this.activeTrade = this.trades[key].clone();
    this.editIndex = key;
    this.showEditDialog = true;
  }

  /**
   * Returns whether the specified leg has the greatest total value
   * @param {number} index The index of the leg
   * @returns {boolean}
   */
  isGreater(index: number): boolean {
    return this.activeTrade.isGreater(index);
  }
}
