import router from '@/router'
import endpoints from '@/api-endpoints'
import axiosAuthInstance from '@/axios-auth'

const namespaced = true

const getDefaultState = () => {
  return {
    authToken: null,
    user: null
  }
}

const state = getDefaultState()

const getters = {
  getUser: (state) => state.user === null ? 'No user' : state.user.username,
  getName: (state) => state.user === null ? 'No name' : `${state.user.firstname} ${state.user.lastname}`
}

const mutations = {
  SET_AUTHENTICATION (state, payload) {
    state.authToken = payload.token
    state.user = payload.user
  },
  CLEAR_AUTHENTICATION (state, payload) {
    state.authToken = null
    state.user = null
  }
}

const actions = {
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
