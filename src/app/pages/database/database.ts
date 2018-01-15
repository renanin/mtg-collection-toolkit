import { Action } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import NmdeThinking from '../../components/nmde-thinking/nmde-thinking.vue';

@Component({
  components: {
    NmdeThinking,
  },
})

export default class Database extends Vue {
  @Action fetchSets;
  mounted() {
    (this.$refs.loadingIndicator as Vue).$emit('start');
    this.fetchSets()
      .then(() => {
        console.log('done');
        (this.$refs.loadingIndicator as Vue).$emit('stop');
      })
      .catch((e) => {
        // @TODO
        console.error(e);
      });
  }
}
