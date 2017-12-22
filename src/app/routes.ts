import { ComponentOptions } from 'vue';
import database from './pages/database/database.vue';
import DatabasePageComponent from './pages/database/component';
import set from './pages/set/set.vue';
import SetPageComponent from './pages/set/component';

export default [
  {
    path: '/',
    redirect: 'database',
  }, {
    path: '/database',
    component: <ComponentOptions<DatabasePageComponent>>database,
  }, {
    path: '/set/:code',
    component: <ComponentOptions<SetPageComponent>>set,
  }
];
