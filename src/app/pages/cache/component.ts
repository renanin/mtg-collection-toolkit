import Vue from 'vue';

interface CacheSize {
  // @TODO
}

export default interface CachePageComponent extends Vue {
  cacheSize: CacheSize;
}
