import { ComponentOptions } from 'vue';
import AppComponent from './component';
import router from '../bootstrap';
import NmdeApp from './components/nmde-app/nmde-app.vue';
import NmdeToolbar from './components/nmde-toolbar/nmde-toolbar.vue';

export default {
  router,
  components: {
    NmdeApp,
    NmdeToolbar,
  },
} as ComponentOptions<AppComponent>;
