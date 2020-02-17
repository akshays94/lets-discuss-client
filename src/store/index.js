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
    },
    question: {
      questionItem: {},
      answers: [],
      is_hidden_add_update_answer: true
    }
  },
  getters: {
    getUser: (state) => state.user === null ? 'No user' : state.user.username,
    getQuestions: (state) => state.questions.data,
    getQuestionsIsLoading: (state) => state.questions.is_loading,
    getQuestion: (state) => state.question.questionItem,
    getAnswers: (state) => state.question.answers,
    getIsHiddenAddUpdateAnswer: (state) => state.question.is_hidden_add_update_answer
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
    },
    SET_QUESTION (state, payload) {
      state.question.questionItem = payload
    },
    SET_ANSWERS (state, payload) {
      state.question.answers = payload
    },
    SET_IS_HIDDEN_ADD_UPDATE_ANSWER (state, payload) {
      state.question.is_hidden_add_update_answer = payload
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

    fetchQuestions ({ state, commit }) {
      const { url, method } = endpoints.questions
      commit('SET_IS_LOADING_QUESTIONS', true)
      setTimeout(() => {
        axiosAppInstance({
          method,
          url,
          headers: {
            Authorization: `Token ${state.authToken}`
          }
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

    createNewQuestion ({ state }, payload) {
      const { title, content } = payload
      const { url, method } = endpoints.createQuestion

      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${state.authToken}`
        },
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
    },

    fetchQuestion ({ state, commit }, payload) {
      const { questionId } = payload
      let { url, method } = endpoints.getQuestion

      url = url.replace(':questionId', questionId)
      console.log('url', url)

      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${state.authToken}`
        }
      })
        .then(res => {
          // TODO: success message
          commit('SET_QUESTION', res.data)
        })
        .catch(err => console.log(err))
    },

    fetchAnswers ({ state, commit }, payload) {
      const { questionId } = payload
      let { url, method } = endpoints.getAnswers

      url = url.replace(':questionId', questionId)
      console.log('url', url)

      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${state.authToken}`
        }
      })
        .then(res => {
          // TODO: success message
          commit('SET_ANSWERS', res.data)
        })
        .catch(err => console.log(err))
    },

    upvoteQuestion ({ state, getters, dispatch }, payload) {
      const { questionId } = payload
      let { url, method } = endpoints.upvoteQuestion

      url = url.replace(':questionId', questionId)
      console.log('url', url)

      let elementBackup = {}

      for (let index = 0; index < getters.getQuestions.length; index++) {
        const element = getters.getQuestions[index]
        if (element.id === questionId) {
          elementBackup = Object.assign({}, element)
          element.is_upvoted = true
          if (elementBackup.is_downvoted) {
            element.is_downvoted = false
          }
          break
        }
      }

      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${state.authToken}`
        }
      })
        .then(res => {
          // TODO: success message
          dispatch('refreshQuestionVotes', {
            questionId
          })
        })
        .catch(err => {
          console.log(err)
          for (let index = 0; index < getters.getQuestions.length; index++) {
            const element = getters.getQuestions[index]
            if (element.id === questionId) {
              element.is_voted = elementBackup.is_voted
              element.is_upvoted = elementBackup.is_upvoted
              element.is_downvoted = elementBackup.is_downvoted
              break
            }
          }
        })
    },

    downvoteQuestion ({ state, getters, dispatch }, payload) {
      const { questionId } = payload
      let { url, method } = endpoints.downvoteQuestion

      url = url.replace(':questionId', questionId)
      console.log('url', url)
      
      let elementBackup = {}

      for (let index = 0; index < getters.getQuestions.length; index++) {
        const element = getters.getQuestions[index]
        if (element.id === questionId) {
          elementBackup = Object.assign({}, element)
          element.is_downvoted = true
          if (elementBackup.is_upvoted) {
            element.is_upvoted = false
          }
          break
        }
      }

      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${state.authToken}`
        }
      })
        .then(res => {
          // TODO: success message
          dispatch('refreshQuestionVotes', {
            questionId
          })
        })
        .catch(err => {
          console.log(err)
          for (let index = 0; index < getters.getQuestions.length; index++) {
            const element = getters.getQuestions[index]
            if (element.id === questionId) {
              element.is_voted = elementBackup.is_voted
              element.is_upvoted = elementBackup.is_upvoted
              element.is_downvoted = elementBackup.is_downvoted
              break
            }
          }
        })
    },

    revokeVoteQuestion ({ state, getters, dispatch }, payload) {
      const { questionId } = payload
      let { url, method } = endpoints.revokeVoteQuestion

      url = url.replace(':questionId', questionId)
      console.log('url', url)
      
      let elementBackup = {}

      for (let index = 0; index < getters.getQuestions.length; index++) {
        const element = getters.getQuestions[index]
        if (element.id === questionId) {
          elementBackup = Object.assign({}, element)
          element.is_downvoted = false
          element.is_upvoted = false
          break
        }
      }

      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${state.authToken}`
        }
      })
        .then(res => {
          // TODO: success message
          dispatch('refreshQuestionVotes', {
            questionId
          })
        })
        .catch(err => {
          console.log(err)
          for (let index = 0; index < getters.getQuestions.length; index++) {
            const element = getters.getQuestions[index]
            if (element.id === questionId) {
              element.is_voted = elementBackup.is_voted
              element.is_upvoted = elementBackup.is_upvoted
              element.is_downvoted = elementBackup.is_downvoted
              break
            }
          }
        })
    },

    refreshQuestionVotes ({ state, getters }, payload) {
      const { questionId } = payload
      let { url, method } = endpoints.getQuestionVotes

      url = url.replace(':questionId', questionId)
      console.log('url', url)
     
      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${state.authToken}`
        }
      })
        .then(res => {
          for (let index = 0; index < getters.getQuestions.length; index++) {
            const element = getters.getQuestions[index]
            if (element.id === questionId) {
              element.votes = res.data.votes
              break
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    createAnswer ({ state, commit, dispatch }, payload) {
      const { questionId, content } = payload
      let { url, method } = endpoints.createAnswer

      url = url.replace(':questionId', questionId)
      console.log('url', url)

      axiosAppInstance({
        method,
        url,
        data: {
          content: content
        },
        headers: {
          Authorization: `Token ${state.authToken}`
        }
      })
        .then(res => {
          // TODO: success message
          commit('SET_IS_HIDDEN_ADD_UPDATE_ANSWER', true)
          dispatch('fetchAnswers', {
            questionId
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
