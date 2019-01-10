export default {
  isActive(state, getters, rootState, rootGetters){
    return state.pendingNum > 0;
  },
}

