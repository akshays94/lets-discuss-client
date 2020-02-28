<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <AppHeader :title="`Create Question`" />
      </div>
    </div>  
    <div class="row">
      <div class="col-sm-12">
        <div class="form-box">
          <div class="form-group">
            <label for="">Title</label>
            <input v-model="title" type="email" class="form-control" placeholder="Enter title">
          </div>
          <div class="form-group">
            <label for="">Content</label>
            <textarea rows="10" placeholder="Enter content" class="form-control" style="min-width: 100%" v-model="content"></textarea>
          </div>
          <div class="align-center">
              <button
                @click="saveQuestion()"
                class="btn btn-primary btn-sm"
                :disabled="content.trim().length == 0 || title.trim().length == 0"
              >Post Question</button>
              &nbsp;
              <button
                @click="navigateToQuestionsPage()"
                class="btn btn-danger btn-sm"
              >Cancel</button>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script> 
import Vuex from 'vuex'
import AppHeader from '@/components/layout/Header'

export default {
  components: {
    AppHeader
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    ...Vuex.mapActions('QnaStore', [
      'createNewQuestion'
    ]),
    navigateToQuestionsPage () {
      this.$router.push({ name: 'questions' })
    },
    saveQuestion () {
      this.createNewQuestion({
        title: this.title,
        content: this.content 
      })
    }
  }
}
</script>

<style scoped>
div {
  text-align: left;
}
</style>
