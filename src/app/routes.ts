import { ComponentOptions } from 'vue';
import database from './pages/database/database.vue';
import DatabasePageComponent from './pages/database/component';
import set from './pages/set/set.vue';
import SetPageComponent from './pages/set/component';
import settings from './pages/settings/settings.vue';
import SettingsPageComponent from './pages/settings/component';
import csv from './pages/csv/csv.vue';
import CSVPageComponent from './pages/csv/component';
import trades from './pages/trades/trades.vue';
import TradesPageComponent from './pages/trades/component';

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
  }, {
    path: '/settings',
    component: <ComponentOptions<SettingsPageComponent>>settings,
  }, {
    path: '/csv',
    component: <ComponentOptions<CSVPageComponent>>csv,
  }, {
    path: '/trades',
    component: <ComponentOptions<TradesPageComponent>>trades,
  },
];
