import Vue from 'vue';

interface CacheSize {
  // @TODO
}

export default interface CacheComponent extends Vue {
  cacheSize: CacheSize;
}
