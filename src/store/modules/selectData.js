import { GetTimeTables, GetWorkNode } from '@/api/SelectData';

const state = {
  TimeTables: [],
  WorkNode: []
};

const mutations = {
  SET_TIMETABLES: (state, TimeTables) => {
    state.TimeTables = TimeTables;
  },
  SET_WORkNODE: (state, WorkNode) => {
    state.WorkNode = WorkNode;
  }
};

const actions = {
  getTimeTables({ commit }) {
    const query = {
      'comNo': 'L1'
    };

    return new Promise((resolve, reject) => {
      GetTimeTables(query).then(response => {
        commit('SET_TIMETABLES', response);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },
  getWorkNode({ commit }, value) {
    const query = JSON.stringify({
      comNo: value.comNo,
      asNo: value.asNo,
      loopNum: value.loopNum
    });

    return new Promise((resolve, reject) => {
      GetWorkNode(query).then(response => {
        commit('SET_WORkNODE', response);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
