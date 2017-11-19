import Vue from 'vue';
import App from './app/App.vue';
import AppComponent from './app/component';
import './bootstrap';

export default new Vue(<Vue.ComponentOptions<AppComponent>>App).$mount('#app');
