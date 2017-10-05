import { ipcRenderer } from 'electron';

export default {
  data() {
    return {
      cacheSize: {},
    };
  },
  mounted() {
    ipcRenderer.send('get-cache-size');
    ipcRenderer.on('cache-size-result', (event, data) => {
      this.cacheSize = data;
    });
  },
  methods: {
    convertToMb(bytes) {
      return Math.round((bytes / 1000000) * 100) / 100;
    },
    clear(category) {
      ipcRenderer.send('clear-cache', category);
    },
  },
};
