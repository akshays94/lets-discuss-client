<template>
  <div
    class="q-box">
    <!-- <div class="q-box--vote-action">
      <arrow-up-bold-icon title="this is an icon!" :size="100" />
      <ArrowDownBoldIcon/>
    </div> -->
    <div class="q-box--details">
      <div class="q-box--details--title">
        <router-link
          :to="{ name: 'question', params: { questionId: question.id } }">
          {{ question.title }}
        </router-link>
      </div>    
      <div class="q-box--details--content">
        {{ modifiedQuestionContent }}
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
</template>

<script>
import Vuex from 'vuex'

export default {
  props: [
    'question'
  ],
  computed: {
    modifiedQuestionContent () {
      let WANTED_LENGTH = 200
      if (this.question.content.length < WANTED_LENGTH) {
        return this.question.content
      } else {
        return `${this.question.content.substring(0, WANTED_LENGTH)}...`
      }
    }
  },
  methods: {
    ...Vuex.mapActions([
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
