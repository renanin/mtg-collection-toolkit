import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import NmdeProgress from '../../components/nmde-progress/nmde-progress.vue';
import Set from '../../classes/set';
import fetchIcon from '../../util/fetchIcon';

@Component({
  name: 'mtg-set',
  components: {
    NmdeProgress,
  },
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

  /**
   * The set icon
   * @name MTGSet#icon
   * @type {string}
   */
  icon: string = '';

  created() {
    fetchIcon(this.set)
      .then(() => {
        this.icon = `cache/icons/${this.set.getCode()}.svg`;
      });
  }
}
