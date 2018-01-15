import { Action } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import NmdeThinking from '../../components/nmde-thinking/nmde-thinking.vue';
import { setInterval, clearInterval } from 'timers';

@Component({
  components: {
    NmdeThinking,
  },
})

/**
 * @class Database
 * @classdesc The main database
 */
export default class Database extends Vue {
  /**
   * The percentage of the black in the gradient
   * @name Database#blackPercent
   * @type {number}
   */
  blackPercent: number = 100;
  /**
   * The percentage of the orange in the gradient
   * @name Database#orangePercent
   * @type {number}
   */
  orangePercent: number = 100;
  /**
   * The gradient for the title
   * @name Database#gradient
   * @type {string}
   */
  get gradient(): string {
    return `linear-gradient(90deg,#212121 ${this.blackPercent}%,#FFA826 ${this.orangePercent}%)`;
  }

  @Action fetchSets;
  mounted() {
    (this.$refs.loadingIndicator as Vue).$emit('start');
    this.fetchSets()
      .then(() => {
        console.log('done');
        (this.$refs.loadingIndicator as Vue).$emit('stop');
        setTimeout(
          () => {
            this.blackPercent = 0;
            let x = 0;
            const u0 = 0;
            const u1 = 0.35;
            const u2 = 0.2;
            const u3 = 0.85;
            const colorLoop = setInterval(
              () => {
                if (this.orangePercent > 0) {
                  this.orangePercent -= (u0 * Math.pow(1 - x, 3)) + (3 * u1 * Math.pow(1 - x, 2) * x) + (3 * u2 * (1 - x) * Math.pow(x, 2)) + (u3 * Math.pow(x, 3));
                } else {
                  clearInterval(colorLoop);
                }
                x += 0.07;
              },
              1,
            );
          },
          850,
        );
      })
      .catch((e) => {
        // @TODO
        console.error(e);
      });
  }
}
