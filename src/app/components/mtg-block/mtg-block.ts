import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import Block from '../../classes/block';
import MtgSet from '../mtg-set/mtg-set.vue';
import NmdeMenu from '../nmde-menu/nmde-menu.vue';
import NmdeProgress from '../nmde-progress/nmde-progress.vue';
import Set from '../../classes/set';

@Component({
  components: {
    MtgSet,
    NmdeMenu,
    NmdeProgress,
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
    let found = false;
    let re = this.block[0].getGroupName();
    let i = 0;
    while (!found && i < this.block.length) {
      if (this.block[i].getGroupName()) {
        re = this.block[i].getGroupName();
        found = true;
      }
      i += 1;
    }
    return re;
  }

  /**
   * Toggles the visibility of the popup
   */
  togglePopup() {
    (this.$refs.popup as Vue).$emit('toggle');
  }
}
