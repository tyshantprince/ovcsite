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
    categories: state => {
      const categories = []

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          to: `/category/${text}`
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories)
    }
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
