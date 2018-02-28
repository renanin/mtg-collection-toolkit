import { Prop, Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import Leg from '../../classes/leg';

@Component({})

/**
 * @class LegComponent
 * @classdesc A component for use on the add trades page which represents a single side of a trade
 * @extends Vue
 */
export default class LegComponent extends Vue {
  /**
   * The title to be displayed in the top toolbar
   * @name LegComponent#title
   * @type {string}
   */
  @Prop() title: string;

  /**
   * The leg
   * @name LegComponent#value
   * @type {Leg}
   */
  @Prop() value: Leg;

  /**
   * A local copy of the leg being edited
   * @name LegComponent#leg
   * @type {Leg}
   */
  leg: Leg;

  /**
   * The total value of the cash and cards in the leg
   * @name LegComponent#sum
   * @type {number}
   */
  get sum(): number {
    return this.leg.cash;
  }

  /**
   * Validates & updates the cash amount in the leg
   * @param amount 
   */
  updateCash(amount: number) {
    this.leg.cash = amount;
    this.$emit('input', this.leg);
  }

  @Watch('value')
  /**
   * Syncs Leg#leg and Leg#value
   */
  onValueChanged() {
    this.leg = this.value;
  }

  /**
   * @constructs
   */
  constructor() {
    super();
    this.leg = new Leg();
  }
}
