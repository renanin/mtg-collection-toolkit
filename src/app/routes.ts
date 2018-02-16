import Trades from './pages/trades/trades.vue';

export default [
  {
    path: '/',
    redirect: 'trades',
  }, {
    path: '/trades',
    component: Trades,
  },
];
