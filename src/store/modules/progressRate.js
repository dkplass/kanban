// import { GetLoopFisrtWorkNode, GetLoopLastWorkNode } from '@/api/ProgressRate'

const state = {
  LoopFisrtWorkNode: '',
  LoopLastWorkNode: ''
}

const mutations = {
  SET_LoopFisrtWorkNode: (state, LoopFisrtWorkNode) => {
    state.LoopFisrtWorkNode = LoopFisrtWorkNode
  },
  SET_LoopLastWorkNode: (state, LoopLastWorkNode) => {
    state.LoopLastWorkNode = LoopLastWorkNode
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
