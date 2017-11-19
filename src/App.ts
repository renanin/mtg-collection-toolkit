import electron from 'electron';
import Vue from 'vue';
import router from './bootstrap';
import store from './store';
import AppComponent from './component';

const { ipcRenderer } = electron;

export default {
  router,
  store,
  mounted() {
    ipcRenderer.send('request-collection');
    ipcRenderer.on('load-collection', (event, collection) => {
      this.$store.commit('loadCollection', JSON.parse(collection));
    });
  },
} as Vue.ComponentOptions<AppComponent>;
