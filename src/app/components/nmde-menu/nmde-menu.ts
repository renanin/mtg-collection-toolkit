import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})

/**
 * @class NmdeMenu
 * @classdesc A popup menu
 */
export default class NmdeMenu extends Vue {
  /**
   * Whether or not the menu is open
   * @name NmdeMenu#active
   * @type {boolean}
   */
  active: boolean = false;

  created() {
    this.$on('toggle', () => {
      this.active = !this.active;
    });
  }
}
