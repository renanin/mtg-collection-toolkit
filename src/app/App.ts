import Vue from 'vue';
import router from '../bootstrap';
import store from './store';
import AppComponent from './component';

export default {
  router,
  store,
} as Vue.ComponentOptions<AppComponent>;
