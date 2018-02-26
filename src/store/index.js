import Vuex from 'vuex';

const basic = new Vuex.Store({
  state: {
    money: '',
    productId: ''
  },
  getters: {

  },
  acitons: {

  },
  mutations: {
    increment(state, payload) {
      state.money = payload;
    },
    setProductId(state, payload) {
      state.productId = payload;
    }
  }
});

export default basic;
