import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({})

/**
 * @class DashboardItem
 * @classdesc A single panel on the dashboard
 * @extends Vue
 */
export default class DashboardItem extends Vue {
  /**
   * The title to appear on the dashboard item
   * @name DashboardItem#title
   * @type {string}
   */
  @Prop()
  title: string;
}
