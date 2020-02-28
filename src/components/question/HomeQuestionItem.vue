<template>
  <div
    class="q-box">
    <div class="q-box--actions">
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
      <div class="q-box--actions--2">
        <div 
          class="q-box--actions--2--btn"
          @click="is_starred ? unmarkStar() : markStar()">
          <font-awesome-icon 
            :icon="['fas', 'star']" 
            size="sm" 
            :color="is_starred ? '#FFDF00' : 'lightgray'" />
        </div>  
      </div>
    </div>

    <div class="q-box--details">
      <div class="q-box--details--askedby">
        Posted by 
        <router-link :to="{ name: 'profile', params: { userId: question.created_by.id } }">
          {{ question.created_by.first_name }} {{ question.created_by.last_name }}
        </router-link>
        | 
        <span :title="question.created_on_date">
          {{ question.created_on_humanized }} <span v-if="question.created_on_humanized !== 'now'">ago</span>
        </span>
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

    <div class="q-box--answers">
      <div 
        class="q-box--answers--icon"
        :class="{ correct: question.is_marked_correct_answer }">
        <font-awesome-icon 
          :icon="['fas', 'comment-alt']" 
          size="lg" />
      </div>
      <div 
        class="q-box--answers--number"
        :class="{ correct: question.is_marked_correct_answer }">
        {{ question.answers_count }}
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
  data () {
    return {
      is_starred: false
    }
  },
  created () {
    this.is_starred = this.question.is_starred
  },
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
      'revokeVoteQuestion',
      'markStarQuestion',
      'unmarkStarQuestion'
    ]),
    markStar () {
      this.is_starred = true
      this.markStarQuestion({
        questionId: this.question.id
      })
    },
    unmarkStar () {
      this.is_starred = false
      this.unmarkStarQuestion({
        questionId: this.question.id
      })
    }
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

.q-box--actions {
  flex-basis: 10%;
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

.q-box--actions--2--btn {
  text-align: center; 
  padding-left: 12px; 
  cursor: pointer;
}  

.q-box--details {
  /* border: 1px solid blue; */
  padding: 12px;
  flex-basis: 90%;
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

.q-box--answers {
  /* border: 1px solid lightgray; */
  flex-basis: 10%;
  padding: 12px;
  display: flex;
  justify-content: center;
}

.q-box--answers--icon {
  margin-top: 2px;
  color: lightgray;
}

.q-box--answers--icon.correct {
  color: #28a745;
}

.q-box--answers--number {
  margin-left: 8px;
  color: lightgray;
  font-weight: bold;
}
.q-box--answers--number.correct {
  color: #28a745;
}
</style>
