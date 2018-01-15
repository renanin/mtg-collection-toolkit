import { ComponentOptions } from 'vue';
import database from './pages/database/database.vue';

export default [
  {
    path: '/',
    redirect: 'database',
  }, {
    path: '/database',
    component: database,
  },
];
