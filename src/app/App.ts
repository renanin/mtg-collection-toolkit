import { ComponentOptions } from 'vue';
import router from '../bootstrap';
import store from './store';
import AppComponent from './component';

export default {
  router,
  store,
  mounted() {
    this.$store.dispatch('readCollection');
  },
} as ComponentOptions<AppComponent>;
