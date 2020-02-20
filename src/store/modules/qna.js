import axiosAppInstance from '@/axios-app'
import endpoints from '@/api-endpoints'
import router from '@/router'

const namespaced = true

const getDefaultState = () => {
  return {
    questions: {
      data: [],
      is_loading: false
    },
    question: {
      questionItem: {},
      is_question_votes_loading: false,
      answers: [],
      is_hidden_add_update_answer: true,
      is_posting_answer: false
    }
  }
}

const state = getDefaultState()

const getters = {
  getQuestions: (state) => state.questions.data,
  getQuestionsIsLoading: (state) => state.questions.is_loading,
  getQuestion: (state) => state.question.questionItem,
  getAnswers: (state) => state.question.answers,
  getIsHiddenAddUpdateAnswer: (state) => state.question.is_hidden_add_update_answer,
  getIsQuestionVotesLoading: (state) => state.question.is_question_votes_loading,
  getIsPostingAnswer: (state) => state.question.is_posting_answer
}

const mutations = {
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
  },
  SET_IS_QUESTION_VOTES_LOADING (state, payload) {
    state.question.is_question_votes_loading = payload
  },
  SET_IS_VOTES_LOADING_IN_ANSWERS (state) {
    for (let index = 0; index < state.question.answers.length; index++) {
      const answerItem = state.question.answers[index]
      answerItem.is_votes_loading = false
    }
  },
  SET_IS_POSTING_ANSWER (state, payload) {
    state.question.is_posting_answer = payload
  }
}

const actions = {
  fetchQuestions ({ commit, rootState }) {
    const { url, method } = endpoints.questions
    commit('SET_IS_LOADING_QUESTIONS', true)
    const WAIT_FOR_SECS = 500
    setTimeout(() => {
      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${rootState.AuthStore.authToken}`
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
    }, WAIT_FOR_SECS)
  },

  createNewQuestion ({ rootState }, payload) {
    const { title, content } = payload
    const { url, method } = endpoints.createQuestion

    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
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

  fetchQuestion ({ commit, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.getQuestion

    url = url.replace(':questionId', questionId)
    // console.log('url', url)

    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        // TODO: success message
        commit('SET_QUESTION', res.data)
      })
      .catch(err => console.log(err))
  },

  fetchAnswers ({ commit, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.getAnswers

    url = url.replace(':questionId', questionId)
    // console.log('url', url)

    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        // TODO: success message
        commit('SET_ANSWERS', res.data)
        commit('SET_IS_VOTES_LOADING_IN_ANSWERS')
      })
      .catch(err => console.log(err))
  },

  upvoteQuestion ({ getters, dispatch, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.upvoteQuestion

    url = url.replace(':questionId', questionId)
    // console.log('url', url)

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
        Authorization: `Token ${rootState.AuthStore.authToken}`
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

  pageUpvoteQuestion ({ commit, dispatch, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.upvoteQuestion

    url = url.replace(':questionId', questionId)
    commit('SET_IS_QUESTION_VOTES_LOADING', true)

    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        dispatch('fetchQuestion', {
          questionId
        })
        commit('SET_IS_QUESTION_VOTES_LOADING', false)
      })
      .catch(err => {
        console.log(err)
        commit('SET_IS_QUESTION_VOTES_LOADING', false)
      })
  },

  downvoteQuestion ({ getters, dispatch, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.downvoteQuestion

    url = url.replace(':questionId', questionId)
    // console.log('url', url)
    
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
        Authorization: `Token ${rootState.AuthStore.authToken}`
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

  pageDownvoteQuestion ({ commit, dispatch, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.downvoteQuestion

    url = url.replace(':questionId', questionId)
    // console.log('url', url)
    
    commit('SET_IS_QUESTION_VOTES_LOADING', true)

    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        // TODO: success message
        dispatch('fetchQuestion', {
          questionId
        })
        commit('SET_IS_QUESTION_VOTES_LOADING', false)
      })
      .catch(err => {
        console.log(err)
        commit('SET_IS_QUESTION_VOTES_LOADING', false)
      })
  },

  revokeVoteQuestion ({ getters, dispatch, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.revokeVoteQuestion

    url = url.replace(':questionId', questionId)
    // console.log('url', url)
    
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
        Authorization: `Token ${rootState.AuthStore.authToken}`
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

  pageRevokeVoteQuestion ({ commit, dispatch, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.revokeVoteQuestion

    url = url.replace(':questionId', questionId)
    // console.log('url', url)
    
    commit('SET_IS_QUESTION_VOTES_LOADING', true)

    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        // TODO: success message
        dispatch('fetchQuestion', {
          questionId
        })
        commit('SET_IS_QUESTION_VOTES_LOADING', false)
      })
      .catch(err => {
        console.log(err)
        commit('SET_IS_QUESTION_VOTES_LOADING', false)
      })
  },

  refreshQuestionVotes ({ getters, rootState }, payload) {
    const { questionId } = payload
    let { url, method } = endpoints.getQuestionVotes

    url = url.replace(':questionId', questionId)
    // console.log('url', url)
   
    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
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

  createAnswer ({ commit, dispatch, rootState }, payload) {
    const { questionId, content } = payload
    let { url, method } = endpoints.createAnswer

    url = url.replace(':questionId', questionId)
    // console.log('url', url)

    commit('SET_IS_POSTING_ANSWER', true)

    const WAIT_FOR_SECS = 2000

    setTimeout(() => {
      axiosAppInstance({
        method,
        url,
        data: {
          content: content
        },
        headers: {
          Authorization: `Token ${rootState.AuthStore.authToken}`
        }
      })
        .then(res => {
          // TODO: success message
          commit('SET_IS_HIDDEN_ADD_UPDATE_ANSWER', true)
          dispatch('fetchAnswers', {
            questionId
          })
          commit('SET_IS_POSTING_ANSWER', false)
        })
        .catch(err => {
          console.log(err)
          commit('SET_IS_POSTING_ANSWER', false)
        })
    }, WAIT_FOR_SECS)
  },

  markAnswerAsCorrect ({ dispatch, rootState }, payload) {
    const { answerId, questionId } = payload
    let { url, method } = endpoints.markAnswerAsCorrect

    url = url.replace(':answerId', answerId)

    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        // TODO: success message
        alert('done')
        dispatch('fetchQuestion', {
          questionId
        })
        dispatch('fetchAnswers', {
          questionId
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  upvoteAnswer ({ getters, dispatch, rootState }, payload) {
    const { answerId, questionId } = payload
    let { url, method } = endpoints.upvoteAnswer

    url = url.replace(':answerId', answerId)
    // console.log('url', url)

    let elementBackup = {}

    for (let index = 0; index < getters.getAnswers.length; index++) {
      const element = getters.getAnswers[index]
      if (element.id === answerId) {
        elementBackup = Object.assign({}, element)
        element.is_upvoted = true
        element.is_votes_loading = true
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
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        // TODO: success message
        dispatch('fetchAnswers', {
          questionId
        })
      })
      .catch(err => {
        console.log(err)
        for (let index = 0; index < getters.getAnswers.length; index++) {
          const element = getters.getAnswers[index]
          if (element.id === answerId) {
            element.is_votes_loading = false
            element.is_voted = elementBackup.is_voted
            element.is_upvoted = elementBackup.is_upvoted
            element.is_downvoted = elementBackup.is_downvoted
            break
          }
        }
      })
  },

  downvoteAnswer ({ getters, dispatch, rootState }, payload) {
    const { answerId, questionId } = payload
    let { url, method } = endpoints.downvoteAnswer

    url = url.replace(':answerId', answerId)
    // console.log('url', url)
    
    let elementBackup = {}

    for (let index = 0; index < getters.getAnswers.length; index++) {
      const element = getters.getAnswers[index]
      if (element.id === answerId) {
        elementBackup = Object.assign({}, element)
        element.is_downvoted = true
        element.is_votes_loading = true
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
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        // TODO: success message
        dispatch('fetchAnswers', {
          questionId
        })
      })
      .catch(err => {
        console.log(err)
        for (let index = 0; index < getters.getAnswers.length; index++) {
          const element = getters.getAnswers[index]
          if (element.id === answerId) {
            element.is_votes_loading = false
            element.is_voted = elementBackup.is_voted
            element.is_upvoted = elementBackup.is_upvoted
            element.is_downvoted = elementBackup.is_downvoted
            break
          }
        }
      })
  },

  revokeVoteAnswer ({ getters, dispatch, rootState }, payload) {
    const { answerId, questionId } = payload
    let { url, method } = endpoints.revokeVoteAnswer

    url = url.replace(':answerId', answerId)
    // console.log('url', url)
    
    for (let index = 0; index < getters.getAnswers.length; index++) {
      const element = getters.getAnswers[index]
      if (element.id === answerId) {
        element.is_votes_loading = true
        break
      }
    }

    axiosAppInstance({
      method,
      url,
      headers: {
        Authorization: `Token ${rootState.AuthStore.authToken}`
      }
    })
      .then(res => {
        // TODO: success message
        dispatch('fetchAnswers', {
          questionId
        })
      })
      .catch(err => {
        console.log(err)
        for (let index = 0; index < getters.getAnswers.length; index++) {
          const element = getters.getAnswers[index]
          if (element.id === answerId) {
            element.is_votes_loading = false
            break
          }
        }
      })
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
