import Add from './pages/trades/add/add.vue';
import Trades from './pages/trades/trades.vue';

export default [
  {
    path: '/',
    redirect: 'trades',
  }, {
    path: '/trades',
    component: Trades,
  }, {
    path: '/trades/add',
    component: Add,
  },
];
