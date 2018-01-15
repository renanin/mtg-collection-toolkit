import Vue from 'vue';
import VueRouter from 'vue-router';
import './assets/fonts/fonts.css';
import routes from './app/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

(Vue as any).router = router;

export default router;
