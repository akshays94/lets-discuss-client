<template>
  <div
    class="q-box">
    
    <div class="q-box--actions--1">      
      <div 
        class="q-box--actions--1--btn"
        :class="{ upvoted: question.is_upvoted }"
        @click="!question.is_upvoted ? upvoteQuestion({ questionId: question.id }) : revokeVoteQuestion({ questionId: question.id })">
        <font-awesome-icon 
          :icon="['fas', 'caret-up']" 
          size="lg" />
      </div>

      <div 
        class="q-box--actions--1--votes"
        :class="{ upvoted: question.is_upvoted, downvoted: question.is_downvoted }">
        <span
          v-if="!question.is_votes_loading">
          {{ question.votes }}
        </span>
        <font-awesome-icon 
          v-else
          :icon="['fas', 'spinner']" 
          color="grey"
          spin />
      </div>
      
      <div 
        class="q-box--actions--1--btn"
        :class="{ downvoted: question.is_downvoted }"
        @click="!question.is_downvoted ? downvoteQuestion({ questionId: question.id }) : revokeVoteQuestion({ questionId: question.id })">
        <font-awesome-icon 
          :icon="['fas', 'caret-down']" 
          size="lg" />
      </div>
    
    </div>

    <div class="q-box--details">
      <div class="q-box--details--askedby">
        Posted by <a href="">
          {{ question.created_by.first_name }} {{ question.created_by.last_name }}
        </a>
        | X mins ago
      </div>
      <div class="q-box--details--title">
        <span style="color:grey">#{{ question.id }}</span> - <router-link
          :to="{ name: 'question', params: { questionId: question.id } }">
          {{ question.title }}
        </router-link>
      </div>    
      <div class="q-box--details--content">
        {{ modifiedQuestionContent }}
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
    ...Vuex.mapActions('QnaStore', [
      'upvoteQuestion',
      'downvoteQuestion',
      'revokeVoteQuestion'
    ])
  }
}
</script>

<style scoped>
.voted {
  color: #28a745;
  font-weight: bold;
}

.q-box {
  text-align: left;
  margin-bottom: 24px;
  display: flex;
  border: 1px solid lightgray;
  box-shadow: 0 2px 3px 0 lightgray;
}

.q-box--actions--1 {
  /* border: 1px solid #dc3545; */
  padding-top: 12px;
  padding-left: 12px;
  display: flex;
}

.q-box--actions--1--votes {
  /* border: 1px solid black; */
  font-size: 1.2em;
  padding: 0 8px;
}

.q-box--actions--1--votes.upvoted {
  color: #28a745;
  font-weight: bold;
}

.q-box--actions--1--votes.downvoted {
  color: #dc3545;
  font-weight: bold;
}

.q-box--actions--1--btn {
  /* border: 1px solid black; */
  height: 26px;
  padding: 0 8px;
}

.q-box--actions--1--btn.upvoted {
  color: #28a745;
}

.q-box--actions--1--btn.downvoted {
  color: #dc3545;
}

.q-box--actions--1--btn:hover {
  background: #efefef;
  cursor: pointer;
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
  color: grey;
}
</style>
