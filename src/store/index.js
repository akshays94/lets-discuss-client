import Vue from 'vue'
import Vuex from 'vuex'

import axiosAuthInstance from '../axios-auth'
import axiosAppInstance from '../axios-app'
import endpoints from '../api-endpoints'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: null,
    user: null,
    questions: {
      data: [],
      is_loading: false
    }
  },
  getters: {
    getUser: (state) => state.user === null ? 'No user' : state.user.username,
    getQuestions: (state) => state.questions.data,
    getQuestionsIsLoading: (state) => state.questions.is_loading 
  },
  mutations: {
    SET_AUTHENTICATION (state, payload) {
      state.authToken = payload.token
      state.user = payload.user
    },
    CLEAR_AUTHENTICATION (state, payload) {
      state.authToken = null
      state.user = null
    },
    SET_QUESTIONS (state, payload) {
      state.questions.data = payload
    },
    SET_IS_LOADING_QUESTIONS (state, payload) {
      state.questions.is_loading = payload
    }
  },
  actions: {
    registerUser ({ commit }, authData) {
      const { url, method } = endpoints.register      
      axiosAuthInstance({
        method,
        url,
        data: authData
      })
        .then(res => {
          console.log(res)
          let userObject = {
            username: res.data.username,
            firstname: res.data.first_name,
            lastname: res.data.last_name,
            email: res.data.email,
            id: res.data.id,
            name: `${res.data.first_name} ${res.data.last_name}`
          }
          commit('SET_AUTHENTICATION', {
            token: res.data.auth_token,
            user: userObject
          })
          localStorage.setItem('token', res.data.auth_token)
          localStorage.setItem('user', JSON.stringify(userObject))
          // TODO: add success message
          router.push({ name: 'questions' })
        })
        .catch(err => console.log(err))
    },

    loginUser ({ commit }, authData) {
      const { url, method } = endpoints.login      
      axiosAuthInstance({
        method,
        url,
        data: authData
      })
        .then(res => {
          console.log(res)
          let userObject = {
            username: res.data.username,
            firstname: res.data.first_name,
            lastname: res.data.last_name,
            email: res.data.email,
            id: res.data.id,
            name: `${res.data.first_name} ${res.data.last_name}`
          }
          commit('SET_AUTHENTICATION', {
            token: res.data.auth_token,
            user: userObject
          })
          localStorage.setItem('token', res.data.auth_token)
          localStorage.setItem('user', JSON.stringify(userObject))
          // TODO: add success message
          router.push({ name: 'questions' })
        })
        .catch(err => console.log(err))
    },

    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const user = localStorage.getItem('user')
      commit('SET_AUTHENTICATION', {
        token,
        user: JSON.parse(user)
      })
    },

    logoutUser ({ commit }) {
      commit('CLEAR_AUTHENTICATION')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.replace('login')
    },

    fetchQuestions ({ commit }) {
      const { url, method } = endpoints.questions
      commit('SET_IS_LOADING_QUESTIONS', true)
      setTimeout(() => {
        axiosAppInstance({
          method,
          url
        })
          .then(res => {
            commit('SET_IS_LOADING_QUESTIONS', false)
            commit('SET_QUESTIONS', res.data)
          })
          .catch(err => {
            commit('SET_IS_LOADING_QUESTIONS', false)
            console.log(err)
          })
      }, 500)
    },

    createNewQuestion ({ commit }, payload) {
      const { title, content } = payload
      const { url, method } = endpoints.createQuestion
      axiosAppInstance({
        method,
        url,
        data: {
          title,
          content
        }
      })
        .then(res => {
          // TODO: success message
          router.push({ name: 'questions' })
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
