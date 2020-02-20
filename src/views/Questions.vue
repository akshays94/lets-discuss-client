<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <AppHeader title="Questions" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div>Questions <span v-if="!isQuestionsLoading">({{ questions.length }})</span> User: {{username}}</div>
        <div>
          <button @click="logout()">Logout</button>
          <button @click="addQuestion()">Add Question</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="isQuestionsLoading" class="col-sm-12">
        Fetching questions ...
      </div>  
      <div v-else class="col-sm-12">
        <div v-if="questions.length > 0">
          <AppQuestionItem             
            v-for="question in questions"
            :key="question.id"
            :question="question"
            />
        </div>
        <div v-else>
          No questions created
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
import Vuex from 'vuex'
import AppQuestionItem from '@/components/HomeQuestionItem'
import AppHeader from '@/components/Header'

export default {
  components: {
    AppQuestionItem,
    AppHeader
  },
  created () {
    this.fetchQuestions()
  },
  computed: {
    ...Vuex.mapGetters('AuthStore', {
      username: 'getUser'
    }),
    ...Vuex.mapGetters('QnaStore', {
      questions: 'getQuestions',
      isQuestionsLoading: 'getQuestionsIsLoading'
    })
  },
  methods: {
    ...Vuex.mapActions('AuthStore', [
      'logoutUser'
    ]),
    ...Vuex.mapActions('QnaStore', [
      'fetchQuestions'
    ]),
    logout () {
      this.logoutUser()
    },
    addQuestion () {
      this.$router.push('add-question')
    }
  }
}
</script>
