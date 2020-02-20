<template>
  <div>
    <div class="post-as">
      Post as <a href="">{{ username }}</a>
    </div>
    <div class="answer-box">
      <div>
        <textarea class="form-control" style="min-width: 100%" v-model="content"></textarea>
      </div>
      <button 
        type="button" 
        :disabled="content.trim().length == 0"
        class="btn btn-primary btn-sm"
        @click="postAnswer()">
        Post Answer
      </button>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  props: [
    'questionId'
  ],
  data () {
    return {
      content: ''
    }
  },
  computed: {
    username () {
      return this.$store.getters['AuthStore/getUser']
    }
  },
  methods: {
    ...Vuex.mapActions('QnaStore', [
      'createAnswer'
    ]),
    postAnswer () {
      this.createAnswer({
        questionId: this.questionId,
        content: this.content
      })
      this.content = ''
    }
  }
}
</script>

<style scoped>
.answer-box {
  background: #efefef;
  border: 1px solid lightgray;
  padding: 12px;
  margin-bottom: 24px;
}

button {
  margin-top: 12px;
}

.post-as {
  font-size: 0.9em;
}
</style>
