import router from '@/router'
import endpoints from '@/api-endpoints'
import axiosAuthInstance from '@/axios-auth'

const namespaced = true

const getDefaultState = () => {
  return {
    authToken: null,
    user: null,
    is_trying_login: false
  }
}

const state = getDefaultState()

const getters = {
  getUser: (state) => state.user === null ? 'No user' : state.user.username,
  getAuthToken: (state) => state.authToken,
  getName: (state) => state.user === null ? 'No name' : `${state.user.firstname} ${state.user.lastname}`,
  getUserId: (state) => state.user === null ? 'No user id' : state.user.id,
  getIsTryingLogin: (state) => state.is_trying_login
}

const mutations = {
  SET_AUTHENTICATION (state, payload) {
    state.authToken = payload.token
    state.user = payload.user
  },
  CLEAR_AUTHENTICATION (state) {
    state.authToken = null
    state.user = null
  },
  SET_IS_TRYING_LOGIN (state, payload) {
    state.is_trying_login = payload
  }
}

const actions = {
  registerUser ({ commit }, authData) {
    commit('SET_IS_TRYING_LOGIN', true)
    const { url, method } = endpoints.register      
    axiosAuthInstance({
      method,
      url,
      data: authData
    })
      .then(res => {
        commit('SET_IS_TRYING_LOGIN', false)
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
        router.replace({ name: 'questions' })
      })
      .catch(err => {
        console.log(err)
        commit('SET_IS_TRYING_LOGIN', false)
      })
  },

  loginUser ({ commit }, authData) {
    commit('SET_IS_TRYING_LOGIN', true)
    const { url, method } = endpoints.login      
    axiosAuthInstance({
      method,
      url,
      data: authData
    })
      .then(res => {
        commit('SET_IS_TRYING_LOGIN', false)
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
        router.replace({ name: 'questions' })
      })
      .catch(err => {
        console.log(err)
        commit('SET_IS_TRYING_LOGIN', false)
      })
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
    router.replace({ name: 'login' })
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
