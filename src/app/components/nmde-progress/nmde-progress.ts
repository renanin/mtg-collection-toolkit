import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})

/**
 * @class NmdeProgress
 * @classdesc A progress bar
 */
export default class NmdeProgress extends Vue {
  /**
   * The current progress percentage
   * @name NmdeProgress#progress
   * @type {number}
   */
  @Prop({})
  progress: number;
}
