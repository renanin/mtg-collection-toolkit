import Database from './pages/database/database.vue';

export default [
  {
    path: '/',
    redirect: 'database',
  }, {
    path: '/database',
    component: Database,
  },
];
