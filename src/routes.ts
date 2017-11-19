import Vue from 'vue';
import welcome from './pages/welcome/welcome.vue';
import WelcomeComponent from './pages/welcome/component';
import collection from './pages/collection/collection.vue';
import CollectionComponent from './pages/collection/component';
import trades from './pages/trades/trades.vue';
import TradesComponent from './pages/trades/component';
import set from './pages/set/set.vue';
import SetComponent from './pages/set/component';
import cache from './pages/cache/cache.vue';
import CacheComponent from './pages/cache/component';
import csv from './pages/import/csv/csv.vue';
import ImportCSVComponent from './pages/import/csv/component';

export default [
  {
    path: '/',
    component: <Vue.ComponentOptions<WelcomeComponent>>welcome,
  }, {
    path: '/collection',
    component: <Vue.ComponentOptions<CollectionComponent>>collection,
  }, {
    path: '/trades',
    component: <Vue.ComponentOptions<TradesComponent>>trades,
  }, {
    path: '/set/:set',
    component: <Vue.ComponentOptions<SetComponent>>set,
  }, {
    path: '/cache',
    component: <Vue.ComponentOptions<CacheComponent>>cache,
  }, {
    path: '/import/csv',
    component: <Vue.ComponentOptions<ImportCSVComponent>>csv,
  },
];
