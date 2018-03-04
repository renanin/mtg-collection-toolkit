import Component from 'vue-class-component';
import Vue from 'vue';
import Leg from '../../../components/leg/leg.vue';
import Trade from '../../../classes/trade';

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
   * The trade being created
   * @name Add#trade
   * @type {Trade}
   */
  trade: Trade = new Trade(2);

  /**
   * The state of the back dialog
   * @name Add#backDialog
   * @type {boolean}
   */
  backDialog: boolean = false;
}
