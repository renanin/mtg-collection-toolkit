import Vue from 'vue';
import welcome from './pages/welcome/welcome.vue';
import WelcomePageComponent from './pages/welcome/component';
import collection from './pages/collection/collection.vue';
import CollectionPageComponent from './pages/collection/component';

export default [
  {
    path: '/',
    component: <Vue.ComponentOptions<WelcomePageComponent>>welcome,
  }, {
    path: '/collection',
    component: <Vue.ComponentOptions<CollectionPageComponent>>collection,
  },
];
