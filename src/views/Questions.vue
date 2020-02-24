<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <AppHeader :title="`Questions (${questions.length})`" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div style="text-align: right">
          <button
            @click="addQuestion()"
            class="btn btn-primary btn-sm"
          >Ask Question</button>
        </div>
        <br>
      </div>
    </div>
    <div class="row">
      <div v-if="isQuestionsLoading" class="col-sm-12">
        <font-awesome-icon
          :icon="['fas', 'spinner']" 
          color="gray"
          spin /> Fetching questions ...
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
import AppQuestionItem from '@/components/question/HomeQuestionItem'
import AppHeader from '@/components/layout/Header'

export default {
  components: {
    AppQuestionItem,
    AppHeader
  },
  created () {
    this.fetchQuestions()
    this.$store.commit('QnaStore/RESET_QUESTION')
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
