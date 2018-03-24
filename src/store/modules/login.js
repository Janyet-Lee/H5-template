const loginModule = {
  state: {
    phoneNumber: ''
  },
  getters: {

  },
  mutations: {
    SET_PHONE(state, payload) {
      state.phoneNumber = payload.phone;
    }
  },
  actions: {
    setPhone({ commit }, payload) {
      commit('SET_PHONE', payload);
    }
  }
};

export default loginModule;
