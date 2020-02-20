<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <AppQuestionItem 
          :question="question"/>
      </div>

      <div class="col-sm-12">
        <div class="answers">
          <div class="answers--title">
            Answers ({{ answers.length }})
            <hr>
          </div>
          <div
            class="answers--addanswer">
            <AppAddUpdateAnswer :questionId="question.id"/>
          </div>
          <div v-if="answers.length > 0">
            <AppAnswerItem 
              v-for="answer in answers"
              :key="answer.id"
              :answer="answer"
              :question="question" />
          </div>
          <div v-else>
            No answers
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import AppAddUpdateAnswer from '../components/AddUpdateAnswer'
import AppAnswerItem from '@/components/AnswerItem'
import AppQuestionItem from '@/components/PageQuestionItem'

export default {
  components: {
    AppAddUpdateAnswer,
    AppAnswerItem,
    AppQuestionItem
  },
  props: [
    'questionId'
  ],
  data () {
    return {
    }
  },
  created () {
    this.fetchQuestion({
      questionId: this.questionId
    })
    this.fetchAnswers({
      questionId: this.questionId
    })
  },
  computed: {
    ...Vuex.mapGetters('QnaStore', {
      question: 'getQuestion',
      answers: 'getAnswers'
    }),
    isHiddenAddUpdateAnswer: {
      get () {
        return this.$store.getters['QnaStore/getIsHiddenAddUpdateAnswer']
      },
      set (val) {
        this.$store.commit('QnaStore/SET_IS_HIDDEN_ADD_UPDATE_ANSWER', val)
      }
    }
  },
  methods: {
    ...Vuex.mapActions('QnaStore', [
      'fetchQuestion',
      'fetchAnswers'
    ])
  }
}
</script>

<style scoped>
.voted {
  color: green;
  font-weight: bold;
}

.answers {
  text-align: left;
  padding: 24px;
}
</style>
