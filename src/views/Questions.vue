<template>
  <div>
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
        <div
          class="q-box"
          v-for="question in questions"
          :key="question.id">
          <!-- <div class="q-box--vote-action">
            <arrow-up-bold-icon title="this is an icon!" :size="100" />
            <ArrowDownBoldIcon/>
          </div> -->
          <div class="q-box--details">
            <div class="q-box--details--title">
              {{ question.title }}
            </div>    
            <div class="q-box--details--content">
              {{ question.content }}
            </div>
            <div>
              Votes: {{ question.votes }}
            </div>
            <div class="q-box--details--askedby">
              Asked by <a href="">
                {{ question.created_by.first_name }} {{ question.created_by.last_name }}
              </a>
            </div>
            <div class="q-box--details--actions">
              <a href="">Upvote</a>&nbsp;&nbsp;
              <a href="">Downvote</a>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
import Vuex from 'vuex'

export default {
  created () {
    this.fetchQuestions()
  },
  computed: {
    username () {
      return this.$store.getters.getUser
    },
    questions () {
      return this.$store.getters.getQuestions
    },
    isQuestionsLoading () {
      return this.$store.getters.getQuestionsIsLoading
    }
  },
  methods: {
    ...Vuex.mapActions([
      'logoutUser',
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

<style scoped>
.q-box {
  text-align: left;
  margin-bottom: 24px;
  display: flex;
  border: 1px solid lightgray;
  box-shadow: 0 2px 3px 0 lightgray;
}

.q-box--vote-action {
  border: 1px solid purple;
}

.q-box--details {
  /* border: 1px solid blue; */
  padding: 12px;
}

.q-box--details--title {
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1.15em;
}

.q-box--details--content {
  margin-bottom: 8px;
}

.q-box--details--askedby {
  font-size: 0.8em;
  margin-bottom: 8px;
}
</style>
