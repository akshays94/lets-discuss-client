import Vue from 'vue'
import Vuex from 'vuex'

import axiosInstance from '../axios-auth'
import endpoints from '../api-endpoints'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: null,
    user: null
  },
  mutations: {
    SET_AUTH_TOKEN (state, token) { state.authToken = token },
    SET_USER (state, user) { state.user = user }
  },
  actions: {
    registerUser ({ commit }, authData) {
      const { url, method } = endpoints.register      
      axiosInstance({
        method,
        url,
        data: authData
      })
        .then(res => {
          console.log(res)
          commit('SET_AUTH_TOKEN', res.data.auth_token)
          commit('SET_USER', res.data.user)
          alert('Registration successful')
          // this.$router.push({ name: 'login' })
        })
        .catch(err => console.log(err))
    },
    loginUser ({ commit }, authData) {
      const { url, method } = endpoints.login      
      axiosInstance({
        method,
        url,
        data: authData
      })
        .then(res => {
          console.log(res)
          alert('Login successful')
          // this.$router.push({ name: 'login' })
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
