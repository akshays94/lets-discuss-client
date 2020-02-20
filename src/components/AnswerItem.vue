<template>
  <div class="a-box">
    <div class="a-box--actions">
      <div 
        class="a-box--actions--btn">
        <font-awesome-icon 
          :icon="['fas', 'caret-up']" 
          size="lg" />
      </div>

      <div 
        class="a-box--actions--votes">
        {{ answer.votes }}
      </div>
      
      <div 
        class="a-box--actions--btn">
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
          color="green" />
      </div>
    </div>
    <div class="a-box--details">
      <div class="a-box--details--answeredby">
        Posted by <a href="">
          {{ answer.created_by.first_name }} {{ answer.created_by.last_name }}
        </a>
        | X mins ago {{ answer.created_on }}
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
      'markAnswerAsCorrect'
    ])
  }
}
</script>

<style scoped>
.a-box {
  border: 1px solid lightgray;
  padding: 12px 12px 12px 0;
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

.a-box--actions--btn:hover {
  background: #efefef;
}

.a-box--actions--votes {
  text-align: center;
  /* border: 1px solid; */
  /* padding: 0 12px; */

}

.a-box--actions--iscorrect {
  text-align: center;
  /* border: 1px solid; */
  padding: 12px 0;

}

</style>
