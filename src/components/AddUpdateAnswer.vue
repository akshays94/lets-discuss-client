<template>
  <div>
    <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
    <button @click="postAnswer()">POST</button>
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
  methods: {
    ...Vuex.mapActions('QnaStore', [
      'createAnswer'
    ]),
    postAnswer () {
      this.createAnswer({
        questionId: this.questionId,
        content: this.content
      })
    }
  }
}
</script>
