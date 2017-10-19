import electron from 'electron';
import router from './bootstrap';
import store from './store';

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
};
