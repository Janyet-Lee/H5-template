import Vue from 'vue';
import Router from 'vue-router';
// import home from '@/modules/home';
// 登录模块
import login from '@/modules/login/login';
import setPassword from '@/modules/login/setPassword';
import enterPassword from '@/modules/login/enterPassword';
import enterCode from '@/modules/login/enterCode';
// 注册模块
// import regist from '@/modules/register/regist';
// import registSetPassword from '@/modules/register/setPassword';
// 存管模块
// import depository from '@/modules/depository/depository';
import depositorySuccess from '@/modules/depository/success';
import depositoryFail from '@/modules/depository/fail';

// 指南模块
import depositoryGuide from '@/modules/guide/depository-guide';
import accountGuide from '@/modules/guide/account-guide';
import rechargeGuide from '@/modules/guide/recharge-guide';
import investmentGuide from '@/modules/guide/investment-guide';
import withdrawGuide from '@/modules/guide/withdraw-guide';

// 投资模块
import transferList from '@/modules/investment/transfer-claim-list';
import invest from '@/modules/investment/buy';
import investmentSuccess from '@/modules/investment/success';
import investmentFail from '@/modules/investment/fail';

// 充值模块
import rechargeSuccess from '@/modules/investment/recharge/success';
import rechargeFail from '@/modules/investment/recharge/fail';

Vue.use(Router);

export default new Router({
  scrollBehavior() {
    // return {x: 0, y: 0};
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
    // {
    //   path: '/regist',
    //   name: 'regist',
    //   component: regist
    // },
    // {
    //   path: '/regist/setPassword',
    //   name: 'registSetPassword',
    //   component: registSetPassword
    // },
    // 存管相关模块
    {
      path: '/depository/success',
      name: 'depository-success',
      component: depositorySuccess
    },
    {
      path: '/depository/fail',
      name: 'depository-fail',
      component: depositoryFail
    },
    // 村官指南模块
    {
      path: '/guide/depository-guide',
      name: 'depository-guide',
      component: depositoryGuide
    },
    {
      path: '/guide/account-guide',
      name: 'account-guide',
      component: accountGuide
    },
    {
      path: '/guide/recharge-guide',
      name: 'recharge-guide',
      component: rechargeGuide
    },
    {
      path: '/guide/investment-guide',
      name: 'investment-guide',
      component: investmentGuide
    },
    {
      path: '/guide/withdraw-guide',
      name: 'withdraw-guide',
      component: withdrawGuide
    },
    // 投资模块
    {
      path: '/investment/transfer-list',
      name: 'transfer-list',
      component: transferList
    },
    {
      path: '/investment/invest',
      name: 'invest-page',
      component: invest
    },
    {
      path: '/investment/success',
      name: 'investment-success',
      component: investmentSuccess
    },
    {
      path: '/investment/fail',
      name: 'investment-fail',
      component: investmentFail
    },
    {
      path: '/investment/recharge/success',
      name: 'recharge-success',
      component: rechargeSuccess
    },
    {
      path: '/investment/recharge/fail',
      name: 'recharge-fail',
      component: rechargeFail
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
});
