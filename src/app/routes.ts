import { ComponentOptions } from 'vue';
import database from './pages/database/database.vue';
import DatabasePageComponent from './pages/database/component';

export default [
  {
    path: '/',
    redirect: 'database',
  }, {
    path: '/database',
    component: <ComponentOptions<DatabasePageComponent>>database,
  }
];
