// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import request from '@/utils/request';
import 'lib-flexible';

Vue.prototype.$request = request;
Vue.config.productionTip = false;
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
