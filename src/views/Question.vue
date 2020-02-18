<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="q-box">
          <div class="q-box--title mb12">
            {{ question.title }}
          </div>
          <div class="q-box--content mb12">
            {{ question.content }}
          </div>
          <div class="q-box--details--askedby mb12">
            Asked by <a href="">
              {{ questionAuthorName }}
            </a>
             | X mins ago {{ question.created_on }}
          </div>
          <div class="q-box--actions">
            <a
              v-if="!question.is_upvoted"
              @click="upvoteQuestion({ questionId: question.id })">
              Upvote
            </a>
            <span
              v-if="question.is_upvoted"
              @click="revokeVoteQuestion({ questionId: question.id })"
              class="voted">
              Upvoted!
            </span>
            &nbsp;&nbsp;
            <a
              v-if="!question.is_downvoted"
              @click="downvoteQuestion({ questionId: question.id })">
              Downvote
            </a>
            <span
              v-if="question.is_downvoted"
              @click="revokeVoteQuestion({ questionId: question.id })"
              class="voted">
              Downvoted!
            </span>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="answers">
          <div class="answers--title mb12">
            Answers <span>({{ answers.length }})</span> | 
            <button @click="isHiddenAddUpdateAnswer = false">Add Answer</button>
          </div>
          <div 
            v-if="!isHiddenAddUpdateAnswer"
            class="answers--addanswer">
            <AppAddUpdateAnswer :questionId="question.id"/>
          </div>
          <div v-if="answers.length > 0">
            <div 
              class="a-box mb12"
              v-for="answer in answers"
              :key="answer.id">
              <div class="a-box--content mb12">
                {{ answer.content }}
              </div>
              <div class="a-box--details--answeredby mb12">
                Posted by <a href="">
                  {{ answer.created_by.first_name }} {{ answer.created_by.last_name }}
                </a>
                | X mins ago {{ answer.created_on }}
              </div>
            </div>
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

export default {
  components: {
    AppAddUpdateAnswer  
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
    question () {
      return this.$store.getters['QnaStore/getQuestion']
    },
    questionAuthorName () {
      if (this.question !== undefined) {
        return `${this.question.created_by.first_name} ${this.question.created_by.last_name}`
      }
      return ''
    },
    answers () {
      return this.$store.getters['QnaStore/getAnswers']
    },
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
      'fetchAnswers',
      'upvoteQuestion',
      'downvoteQuestion',
      'revokeVoteQuestion'
    ])
  }
}
</script>

<style scoped>
.voted {
  color: green;
  font-weight: bold;
}

.q-box {
  border: 1px solid lightgray;
  text-align: left;
  padding: 24px;
}

.mb12 {
  margin-bottom: 12px;
}

.q-box--title {
  font-size: 1.25em;
  font-weight: bold;
}

.q-box--content {
  text-align: justify;
}

.answers {
  text-align: left;
  padding: 24px;
}

.a-box {
  border: 1px solid lightgray;
  padding: 24px;
}
</style>
