import { ComponentOptions } from 'vue';
import welcome from './pages/welcome/welcome.vue';
import WelcomePageComponent from './pages/welcome/component';
import collection from './pages/collection/collection.vue';
import CollectionPageComponent from './pages/collection/component';
import set from './pages/set/set.vue';
import SetPageComponent from './pages/set/component';

export default [
  {
    path: '/',
    component: <ComponentOptions<WelcomePageComponent>>welcome,
  }, {
    path: '/collection',
    component: <ComponentOptions<CollectionPageComponent>>collection,
  }, {
    path: '/set/:code',
    component: <ComponentOptions<SetPageComponent>>set,
  },
];
