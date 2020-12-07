const state = {
  dictionary: {}
}

const mutations = {
  SET_DICTIONARY: (state, data) => {
    state.dictionary = data
  }
}

const actions = {
  getDictionary({ commit }, locale) {
    // fetch from api
    commit('SET_DICTIONARY')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
