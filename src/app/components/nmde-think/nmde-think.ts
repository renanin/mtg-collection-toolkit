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
  @Prop({
    default: 0,
  })
  offset: number;

  /**
   * If the ball is up or not
   * @name NmdeThink#up
   * @type {boolean}
   * @private
   */
  up: boolean = false;

  created() {
    setTimeout(
      () => {
        setInterval(
          () => {
            this.up = !this.up;
          },
          500,
        );
      },
      this.offset,
    );
  }
}
