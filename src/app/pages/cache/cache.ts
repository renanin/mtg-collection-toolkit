import { ipcRenderer } from 'electron';
import Vue from 'vue';
import CachePageComponent from './component';

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
    convertToMb(bytes: number): number {
      return Math.round((bytes / 1000000) * 100) / 100;
    },
    clear(category: number) {
      ipcRenderer.send('clear-cache', category);
    },
  },
} as Vue.ComponentOptions<CachePageComponent>;
