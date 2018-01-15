import { ComponentOptions } from 'vue';
import AppComponent from './component';
import router from '../bootstrap';
import store from './store';
import NmdeApp from './components/nmde-app/nmde-app.vue';
import NmdeToolbar from './components/nmde-toolbar/nmde-toolbar.vue';

export default {
  router,
  store,
  components: {
    NmdeApp,
    NmdeToolbar,
  },
} as ComponentOptions<AppComponent>;
