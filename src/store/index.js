import Vuex from 'vuex';
import loginModule from './modules/login';

const basic = new Vuex.Store({
  modules: {
    loginModule
  }
});

export default basic;
