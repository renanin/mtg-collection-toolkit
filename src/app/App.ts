import { Action } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import router from '../bootstrap';
import store from './store';

@Component({
  router,
  store,
})

/**
 * @class App
 * @classdesc The main app component
 * @extends Vue
 */
export default class App extends Vue {
  @Action loadCollection;

  created() {
    this.loadCollection();
  }
}
