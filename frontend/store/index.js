import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    articles: {},
    drawer: false,
    items: [
      {
        text: 'Home',
        to: '/'
      },
      {
        text: 'self-help',
        href: '/triage'
      }
    ]
  },
  getters: {
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    loadCategories: (state, payload) => (state.articles = payload)
  },
  actions: {
    fetchCategories({ commit}, categories){
      commit('loadCategories', categories);
    }
  }
}
