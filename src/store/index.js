import Vuex from 'vuex';

const basic = new Vuex.Store({
  state: {
    money: ''
  },
  getters: {

  },
  acitons: {

  },
  mutations: {
    increment(state, payload) {
      state.money = payload;
    }
  }
});

export default basic;
