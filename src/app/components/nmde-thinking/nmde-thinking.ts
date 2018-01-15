import Component from 'vue-class-component';
import Vue from 'vue';
import NmdeThink from '../nmde-think/nmde-think.vue';

@Component({
  components: {
    NmdeThink,
  },
})

/**
 * @class NmdeThinking
 * @classdesc An indeterminate loading animation
 */
export default class NmdeThinking extends Vue {
  /**
   * The positions of the balls
   * @name NmdeThinking#positions
   */
  positions = {
    think1: 0,
    think2: 0,
    think3: 0,
  }

  created() {
    this.$on('start', () => {
      (this.$refs.think1 as Vue).$emit('start');
      setTimeout(
        () => {
          this.positions.think1 = 0;
          this.positions.think2 = 25;
          this.positions.think3 = 50;
          (this.$refs.think2 as Vue).$emit('start');
          setTimeout(
            () => {
              (this.$refs.think3 as Vue).$emit('start');
            },
            300,
          )
        },
        300,
      );
    });
    this.$on('stop', () => {
      (this.$refs.think1 as Vue).$emit('stop');
      setTimeout(
        () => {
          (this.$refs.think2 as Vue).$emit('stop');
          this.positions.think1 = 0;
          this.positions.think2 = 0;
          setTimeout(
            () => {
              (this.$refs.think3 as Vue).$emit('stop');
              this.positions.think3 = 0;
            },
            150,
          );
        },
        300
      );
    });
  }
}
