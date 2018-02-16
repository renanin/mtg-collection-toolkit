import { Action, State } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})

/**
 * @class Database
 * @classdesc The Database page
 * @extends Vue
 */
export default class Database extends Vue {
  @Action fetchSets;
  @State sets;

  created() {
    this.fetchSets().then(() => {
      this.$forceUpdate();
    });
  }
}
