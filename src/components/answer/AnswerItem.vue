<template>
  <div class="a-box">
    <div class="a-box--actions">
      <!-- upvote -->
      <div 
        class="a-box--actions--btn"
        :class="{ upvoted: answer.is_upvoted }"
        @click="!answer.is_upvoted ? upvoteAnswer({ answerId: answer.id, questionId: question.id }) : revokeVoteAnswer({ answerId: answer.id, questionId: question.id })">
        <font-awesome-icon 
          :icon="['fas', 'caret-up']" 
          size="lg" />
      </div>

      <!-- votes -->
      <div 
        class="a-box--actions--votes">
        <span 
          v-if="!answer.is_votes_loading"
          class="a-box--actions--votes--txt"
          :class="{ upvoted: answer.is_upvoted, downvoted: answer.is_downvoted }">
          {{ answer.votes }}
        </span>
        <font-awesome-icon
          v-if="answer.is_votes_loading"
          :icon="['fas', 'spinner']" 
          color="grey"
          spin />
      </div>
      
      <!-- downvote -->
      <div 
        class="a-box--actions--btn"
        :class="{ downvoted: answer.is_downvoted }"
        @click="!answer.is_downvoted ? downvoteAnswer({ answerId: answer.id, questionId: question.id }) : revokeVoteAnswer({ answerId: answer.id, questionId: question.id })">
        <font-awesome-icon 
          :icon="['fas', 'caret-down']" 
          size="lg" />
      </div>

      <div 
        v-if="answer.is_correct"
        class="a-box--actions--iscorrect">
        <font-awesome-icon 
          :icon="['fas', 'check']" 
          size="lg"
          color="#28a745" />
      </div>
    </div>
    <div class="a-box--details">
      <div class="a-box--details--answeredby">
        Posted by 
        <router-link :to="{ name: 'profile', params: { userId: answer.created_by.id } }">
          {{ answer.created_by.first_name }} {{ answer.created_by.last_name }}
        </router-link>
        |
        <span :title="answer.created_on_date">
          {{ answer.created_on_humanized }} <span v-if="answer.created_on_humanized !== 'now'">ago</span>
        </span>
      </div>
      <div class="a-box--content">
        {{ answer.content }}
      </div>

      <div v-if="isShowMarkAsCorrectButton">
        <br>
        <button 
          class="btn btn-outline-success btn-sm"
          @click="markAnswerAsCorrect({ answerId: answer.id, questionId: question.id })">
          Mark as correct
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  props: [
    'answer',
    'question'
  ],
  computed: {
    isShowMarkAsCorrectButton () {
      return this.question.is_created_by_me && !this.question.answer_marked_correct
    }
  },
  methods: {
    ...Vuex.mapActions('QnaStore', [
      'markAnswerAsCorrect',
      'upvoteAnswer',
      'downvoteAnswer',
      'revokeVoteAnswer'
    ])
  }
}
</script>

<style scoped>
.a-box {
  border: 1px solid lightgray;
  padding: 12px 12px 32px 0;
  margin-bottom: 24px;
  display: flex;
}

.a-box--details {
  /* margin-left: 12px; */
}

.a-box--details--answeredby {
  font-size: 0.9em;
  color: gray;
}

.a-box--actions--btn {
  width: 32px;
  text-align: center;
  margin: 0 12px;
  cursor: pointer;
}

.a-box--actions--btn.upvoted {
  color: #28a745;
}

.a-box--actions--btn.downvoted {
  color: #dc3545;
}

.a-box--actions--btn:hover {
  background: #efefef;
}

.a-box--actions--votes {
  text-align: center;
  /* border: 1px solid; */
  /* padding: 0 12px; */
}

.a-box--actions--votes--txt.upvoted {
  font-weight: bold;
  color: #28a745;
}

.a-box--actions--votes--txt.downvoted {
  font-weight: bold;
  color: #dc3545;
}

.a-box--actions--iscorrect {
  text-align: center;
  /* border: 1px solid; */
  padding: 12px 0;

}

</style>
