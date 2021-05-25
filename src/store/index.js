import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persistedstate'
import getters from './getters'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  state: {
    states: 'turn-on',
    radio: '1',
    token: 'ceshi'
  },
  mutations: {
    setTransition(state, val) {
      state.states = val
    },
    radio(state, val) {
      state.radio = val
    },
    SETTOKEN(state, val) {
      state.token = val
    }
  },
  modules,
  getters,
  plugins: [
    VuexPersistence({
      storage: window.localStorage,
      // 配置缓存的内容
      reducer(val) {
        return {
          states: val.states,
          radio: val.radio,
        }
      }
    })
  ]
})

