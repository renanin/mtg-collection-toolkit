import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import { setInterval } from 'timers';

@Component({})

/**
 * @class NmdeThink
 * @classdesc An individual ball for NmdeThinking
 */
export default class NmdeThink extends Vue {
  /**
   * If the ball is up or not
   * @name NmdeThink#up
   * @type {boolean}
   */
  up: boolean = false;

  @Prop({
    default: 0,
  })
  /**
   * The amount, in pixels, the ball is from the leftmost ball
   * @name NmdeThink#left
   * @type {number}
   */
  left: number;

  created() {
    let animationLoop;
    this.$on('start', () => {
      animationLoop = setInterval(
        () => {
          this.up = !this.up;
        },
        500,
      );
    });
    this.$on('stop', () => {
      clearInterval(animationLoop._id);
      this.up = false;
    });
  }
}
