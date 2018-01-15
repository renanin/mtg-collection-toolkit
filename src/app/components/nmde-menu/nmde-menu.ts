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
  /**
   * Whether or not the menu is in the process of closing
   * @name NmdeMenu#closing
   * @type {boolean}
   */
  closing: boolean = false;

  /**
   * Toggles the state of the menu and plays related animations
   */
  toggle() {
    if (this.active) {
      this.closing = true;
      setTimeout(
        () => {
          this.active = false;
          this.closing = false;
        },
        250,
      );
    } else {
      this.active = true;
    }
  }

  created() {
    this.$on('toggle', this.toggle);
  }
}
