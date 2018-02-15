import Vue from 'vue';
import VueRouter from 'vue-router';
import './assets/fonts/fonts.css';
import routes from './app/routes';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

Vue.use(VueRouter);

// @TODO: Use only what I need
Vue.use(VueMaterial);

const router = new VueRouter({
  routes,
});

(Vue as any).router = router;

export default router;
