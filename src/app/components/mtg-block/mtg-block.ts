import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import Block from '../../classes/block';
import MtgSet from '../mtg-set/mtg-set.vue';
import NmdeMenu from '../nmde-menu/nmde-menu.vue';
import Set from '../../classes/set';

@Component({
  components: {
    MtgSet,
    NmdeMenu,
  },
})

export default class MtgBlock extends Vue {
  /**
   * The block to display
   * @name MtgBlock#block
   * @type {Set[]}
   */
  @Prop({})
  block: Set[];

  /**
   * The name of the block
   * @name MtgBlock#name
   * @type {string}
   */
  get name(): string {
    return this.block[0].getBlockName();
  }

  /**
   * Toggles the visibility of the popup
   */
  togglePopup() {
    (this.$refs.popup as Vue).$emit('toggle');
  }
}
