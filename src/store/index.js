import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    addExpenses: false,
    settings: false,
    editUser: false,
    addBalance: false,
    singleCategoryClicked: false,
    sid: false,
    showGraph: false


  },
  mutations: {
    LOGIN(state) {
      state.isLoggedIn = true
    },
    LOGOUT(state) {
      state.isLoggedIn = false
    },
    CHANGE_EXPENSES(state, payload) {
      state.addExpenses = payload
    },
    CHANGE_SETTINGS(state) {
      if (state.settings == false) {
        state.settings = true
      } else {
        state.settings = false
      }
    },
    EDIT_USER(state, payload) {
      state.editUser = payload
    },
    ADD_BALANCE(state, payload) {
      state.addBalance = payload
    },
    SINGLE_CATEGORY(state, payload) {
      state.singleCategoryClicked = payload
    },
    CHANGE_GRAPH(state) {
      if (state.showGraph == false) {
        state.showGraph = true
      } else {
        state.showGraph = false
      }
    }
  },
  actions: {
    userLogin(store) {
      store.commit('LOGIN')
      // console.log(store.state.isLoggedIn)
    },
    logout(store) {
      store.commit('LOGOUT')
    },
    async checkSession(store) {
      let res = await axios.get('http://448k122.e2.mars-hosting.com/novcanik/auth/checkSession', { params: { sid: store.state.sid ? store.state.sid : localStorage.getItem('sid') } })
      if (res.data.res == 'ok') {
        store.state.isLoggedIn = true
      } else {
        store.state.isLoggedIn = false
      }
    },
    changeExpenses(store, payload) {
      store.commit('CHANGE_EXPENSES', payload)
    },
    changeSettings(store) {
      store.commit('CHANGE_SETTINGS')
    },
    editUser(store, payload) {
      store.commit('EDIT_USER', payload)
    },
    addbalance(store, payload) {
      store.commit('ADD_BALANCE', payload)
    },
    singleCatClicked(store, payload) {
      store.commit('SINGLE_CATEGORY', payload)
    },
    graphClicked(store) {
      store.commit('CHANGE_GRAPH')
    },
    closeSettings(store){
      store.state.settings = false
    },
  },
  modules: {
  }
})
export default store
