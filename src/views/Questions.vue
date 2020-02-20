<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <AppHeader :title="`Questions (${questions.length})`" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div>
          <button
            @click="addQuestion()"
            class="btn btn-primary btn-sm"
          >Ask Question</button>
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
    ...Vuex.mapGetters('QnaStore', {
      questions: 'getQuestions',
      isQuestionsLoading: 'getQuestionsIsLoading'
    })
  },
  methods: {
    ...Vuex.mapActions('QnaStore', [
      'fetchQuestions'
    ]),
    addQuestion () {
      this.$router.push('add-question')
    }
  }
}
</script>
