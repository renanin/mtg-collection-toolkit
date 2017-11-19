import Vue from 'vue';
import welcome from './pages/welcome/welcome.vue';
import WelcomePageComponent from './pages/welcome/component';
import collection from './pages/collection/collection.vue';
import CollectionPageComponent from './pages/collection/component';
import trades from './pages/trades/trades.vue';
import TradesPageComponent from './pages/trades/component';
import set from './pages/set/set.vue';
import SetPageComponent from './pages/set/component';
import cache from './pages/cache/cache.vue';
import CachePageComponent from './pages/cache/component';
import csv from './pages/import/csv/csv.vue';
import CSVPageComponent from './pages/import/csv/component';

export default [
  {
    path: '/',
    component: <Vue.ComponentOptions<WelcomePageComponent>>welcome,
  }, {
    path: '/collection',
    component: <Vue.ComponentOptions<CollectionPageComponent>>collection,
  }, {
    path: '/trades',
    component: <Vue.ComponentOptions<TradesPageComponent>>trades,
  }, {
    path: '/set/:set',
    component: <Vue.ComponentOptions<SetPageComponent>>set,
  }, {
    path: '/cache',
    component: <Vue.ComponentOptions<CachePageComponent>>cache,
  }, {
    path: '/import/csv',
    component: <Vue.ComponentOptions<CSVPageComponent>>csv,
  },
];
