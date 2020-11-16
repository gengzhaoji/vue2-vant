import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

/**vuex持续存储插件 */
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    states: 'turn-on',
    radio: '1'
  },
  mutations: {
    setTransition(state, states) {
      state.states = states
    },
    radio(state, states) {
      state.radio = states
    }
  },
  actions: {

  },
  plugins: [vuexLocal.plugin]
})
