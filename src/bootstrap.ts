import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import './assets/fonts/fonts.css';
import routes from './routes';

Vue.use(VueRouter);
Vue.use(VueMaterial);

const router = new VueRouter({
  routes,
});

(Vue as any).router = router;

(Vue as any).material.registerTheme('default', {
  primary: 'orange',
  secondary: 'light-blue',
});

export default router;
