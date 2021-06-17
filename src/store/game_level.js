

const state = () => ({
  levels:[],

})

const mutations = {
  updateLevels(state,data){
    state.levels = data
  },


}

const actions = {
  async fetchLevels({commit,state}){
    console.log('fetch levels')
    if (!state.levels.length>0){
      const response = await this._vm.$api.get(`/api/game_levels`)
      commit('updateLevels',response.data)
    }
  }
}

const getters = {
  levels: (state) => state.levels
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}


