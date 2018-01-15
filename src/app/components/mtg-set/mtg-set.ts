import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import Set from '../../classes/set';

@Component({
  name: 'mtg-set',
})

/**
 * @class MTGSet
 * @classdesc An individual set
 */
export default class MtgSet extends Vue {
  /**
   * The Set object
   * @name MTGSet#set
   * @type {Set}
   */
  @Prop({})
  set: Set;
}
