<template>
  <div>
    <div v-if="Object.keys(question).length > 0">
      <div class="q-box">
        <div class="q-box--actions">
          <!-- upvote -->
          <div 
            class="q-box--actions--btn"
            :title="!question.is_upvoted ? 'Click to upvote': 'Click to revoke upvote'"
            @click="!question.is_upvoted ? pageUpvoteQuestion({ questionId: question.id }) : pageRevokeVoteQuestion({ questionId: question.id })"
            :class="{ upvoted: question.is_upvoted }">
            <font-awesome-icon 
              :icon="['fas', 'caret-up']" 
              size="2x" />
          </div>

          <!-- votes -->
          <div 
            class="q-box--actions--votes"
            :class="{ upvoted: question.is_upvoted, downvoted: question.is_downvoted }">
            <span v-if="!isQuestionVotesLoading">
              {{ question.votes }}
            </span>
            <font-awesome-icon 
              v-if="isQuestionVotesLoading"
              :icon="['fas', 'spinner']" 
              color="grey"
              spin />
          </div>
          
          <!-- downvote -->
          <div 
            class="q-box--actions--btn"
            :title="!question.is_downvoted ? 'Click to downvote': 'Click to revoke downvote'"
            @click="!question.is_downvoted ? pageDownvoteQuestion({ questionId: question.id }) : pageRevokeVoteQuestion({ questionId: question.id })"
            :class="{ downvoted: question.is_downvoted }">
            <font-awesome-icon 
              :icon="['fas', 'caret-down']" 
              size="2x" />
          </div>
        </div>
        <div class="q-box--details">
          <div class="q-box--details--askedby">
            Asked by 
            <router-link :to="{ name: 'profile', params: { userId: question.created_by.id } }">
              {{ questionAuthorName }}
            </router-link>
            | 
            <span :title="question.created_on_date">
              {{ question.created_on_humanized }} <span v-if="question.created_on_humanized !== 'now'">ago</span>
            </span>
          </div>
          <div class="q-box--title">
            <span class="questionid">#{{ question.id }}</span> - {{ question.title }}
          </div>
          <div class="q-box--content">
            {{ question.content }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p><font-awesome-icon
          :icon="['fas', 'spinner']" 
          color="gray"
          spin /> Loading question ...</p>
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
    ...Vuex.mapGetters('QnaStore', {
      isQuestionVotesLoading: 'getIsQuestionVotesLoading'
    }),
    questionAuthorName () {
      if (this.question !== undefined && this.question.created_by !== undefined) {
        return `${this.question.created_by.first_name} ${this.question.created_by.last_name}`
      }
      return ''
    }
  },
  methods: {
    ...Vuex.mapActions('QnaStore', [
      'pageUpvoteQuestion',
      'pageDownvoteQuestion',
      'pageRevokeVoteQuestion'
    ])
  }
}
</script>

<style scoped>
.questionid {
  color: grey;
}

.upvoted {
  color: #28a745;
}

.downvoted {
  color: #dc3545;
}

.q-box {
  border: 1px solid lightgray;
  text-align: left;
  padding: 12px 12px 48px 0;
  display: flex;
}

.q-box--actions--btn {
  width: 50px;
  margin: 0 12px;
  text-align: center;
  cursor: pointer;
}

.q-box--actions--btn:hover {
  background: #efefef;
}

.q-box--actions--votes {
  text-align: center;
}

.q-box--actions--votes.upvoted {
  font-weight: bold;
  color: #28a745;
}

.q-box--actions--votes.downvoted {
  font-weight: bold;
  color: #dc3545;
}

.q-box--title {
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 12px;
}

.q-box--content {
  text-align: justify;
}

.q-box--details--askedby {
  color: grey;
  font-size: 0.9em;
}
</style>
