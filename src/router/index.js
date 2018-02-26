import Vue from 'vue';
import Router from 'vue-router';
import home from '@/modules/home';

Vue.use(Router);

export default new Router({
  scrollBehavior() {
    return {x: 0, y: 0};
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: home
    }
  ]
});
