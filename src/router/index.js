import Vue from 'vue';
import Router from 'vue-router';
import home from '@/modules/home';
import reward from '@/modules/reward';
import recharge from '@/modules/recharge';
import success from '@/modules/success';

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
    },
    {
      path: '/reward',
      name: 'reward',
      component: reward
    },
    {
      path: '/success',
      name: 'success',
      component: success
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    }
  ]
});
