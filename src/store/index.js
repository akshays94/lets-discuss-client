import Vue from 'vue'
import Vuex from 'vuex'

import AuthStore from '@/store/modules/auth'
import QnaStore from '@/store/modules/qna'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AuthStore,
    QnaStore
  }
})
