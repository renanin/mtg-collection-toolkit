import { Action } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import router from '../bootstrap';
import store from './store';
import NmdeApp from './components/nmde-app/nmde-app.vue';
import NmdeToolbar from './components/nmde-toolbar/nmde-toolbar.vue';

@Component({
  router,
  store,
  components: {
    NmdeApp,
    NmdeToolbar,
  },
})

export default class App extends Vue {}
