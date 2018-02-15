import { Action, State } from 'vuex-class';
import { clearInterval, setInterval } from 'timers';
import Component from 'vue-class-component';
import Vue from 'vue';
import async from 'async';
import Block from '../../classes/block';
import MtgBlock from '../../components/mtg-block/mtg-block.vue';
import MtgSet from '../../components/mtg-set/mtg-set.vue';
import NmdeThinking from '../../components/nmde-thinking/nmde-thinking.vue';
import Set from '../../classes/set';
import SetsObject from '../../classes/setsObject';

@Component({
  components: {
    MtgBlock,
    MtgSet,
    NmdeThinking,
  },
})

/**
 * @class Database
 * @classdesc The main database
 */
export default class Database extends Vue {
  @Action fetchSets;
  @State sets: SetsObject;

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
  /**
   * Local list of all sets
   * @name Database#localSets
   * @type {SetObject}
   */
  localSets: SetsObject = {};
  
  /**
   * Returns a list of sets organized by block
   * @return {Set[][]} A list of blocks, each of which is a list of sets.
   */
  blocks(): Set[][] {
    const codes = Object.keys(this.localSets);
    const groups: Block = {};
    const result: Set[][] = [];
    codes.forEach((code) => {
      const group = this.localSets[code].getGroupCode();
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(this.localSets[code]);
    });
    const groupCodes = Object.keys(groups);
    groupCodes.forEach((code) => {
      result.push(groups[code]);
    });
    return result;
  }

  /**
   * Displays and animates the blocks and sets
   */
  displaySets() {
    let i = 0;
    async.eachSeries(
      Object.keys(this.sets),
      (code, next) => {
        this.localSets[code] = this.sets[code];
        this.$forceUpdate();
        if (i <= 50) {
          setTimeout(
            () => {
              next();
            },
            10,
          );
        } else {
          next();
        }
        i += 1;
      },
      () => {
        console.log('Done');
      }
    );
  }

  /**
   * Plays the text gradient animation
   */
  textAnimation() {
    return new Promise((resolve, reject) => {
      this.blackPercent = 0;
      let x = 0;
      const u0 = 0.15;
      const u1 = 0.35;
      const u2 = 0.2;
      const u3 = 0.85;
      async.whilst(
        () => this.orangePercent > 0,
        (next) => {
          this.orangePercent -= (u0 * Math.pow(1 - x, 3)) + (3 * u1 * Math.pow(1 - x, 2) * x) + (3 * u2 * (1 - x) * Math.pow(x, 2)) + (u3 * Math.pow(x, 3));
          x += 0.07;
          setTimeout(
            () => {
              next();
            },
            4,
          );
        },
        () => {
          resolve();
        }
      );
    });
  }

  mounted() {
    (this.$refs.loadingIndicator as Vue).$emit('start');
    this.fetchSets()
      .then(() => {
        (this.$refs.loadingIndicator as Vue).$emit('stop');
        setTimeout(
          () => {
            this.textAnimation().then(() => {
              this.displaySets();
            });
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
