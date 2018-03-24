import Vue from 'vue';
import Router from 'vue-router';
// import home from '@/modules/home';
// 登录模块
import login from '@/modules/login/login';
import setPassword from '@/modules/login/setPassword';
import enterPassword from '@/modules/login/enterPassword';
import enterCode from '@/modules/login/enterCode';
// 注册模块
import regist from '@/modules/register/regist';
import registSetPassword from '@/modules/register/setPassword';

Vue.use(Router);

export default new Router({
  scrollBehavior() {
    return {x: 0, y: 0};
  },
  routes: [
    // 登录模块
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/setPassword',
      name: 'setPassword',
      component: setPassword
    },
    {
      path: '/enterPassword',
      name: 'enterPassword',
      component: enterPassword
    },
    {
      path: '/enterCode',
      name: 'enterCode',
      component: enterCode
    },
    // 注册模块
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/regist/setPassword',
      name: 'registSetPassword',
      component: registSetPassword
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
});
