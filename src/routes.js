import welcome from './pages/welcome/welcome.vue';
import collection from './pages/collection/collection.vue';
import trades from './pages/trades/trades.vue';

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
  },
];
