import welcome from './pages/welcome/welcome.vue';
import collection from './pages/collection/collection.vue';
import trades from './pages/trades/trades.vue';
import set from './pages/set/set.vue';
import cache from './pages/cache/cache.vue';

export default [
  {
    path: '/',
    component: welcome,
  }, {
    path: '/collection',
    component: collection,
  }, {
    path: '/trades',
    component: trades,
  }, {
    path: '/set/:set',
    component: set,
  }, {
    path: '/cache',
    component: cache,
  },
];
