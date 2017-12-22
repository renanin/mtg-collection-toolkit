import { ComponentOptions } from 'vue';
import router from '../bootstrap';
import store from './store';
import AppComponent from './component';
import bus from '../bus';

export default {
  router,
  store,
  data() {
    return {
      notification: '',
    };
  },
  mounted() {
    this.$store.dispatch('readCollection');
    bus.$on('notify', (message) => {
      this.notification = message;
      this.$refs.notification.open();
    });
  },
} as ComponentOptions<AppComponent>;
