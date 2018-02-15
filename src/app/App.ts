import { Action } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import router from '../bootstrap';
import store from './store';

@Component({
  router,
  store,
})

export default class App extends Vue {}
