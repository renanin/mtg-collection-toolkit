import Vue from 'vue';
import App from './App.vue';
import AppComponent from './component';
import './bootstrap';

export default new Vue(<Vue.ComponentOptions<AppComponent>>App).$mount('#app');
