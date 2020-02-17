<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-box">
          <h3 class="text-center">Add Question</h3>
          <br/>
          <div class="form-group">
              <input 
                v-model="title"
                type="text" 
                class="form-control" 
                id="title" 
                placeholder="Title">
          </div>
          <div class="form-group">
              <label for="content">Content:</label>
              <textarea v-model="content" name="" id="" cols="30" rows=""></textarea>
          </div>
          <br/>
          <div class="align-center">
              <button
                @click="saveQuestion()"
                class="btn btn-success"
              >Save</button>
              &nbsp;
              <button
                @click="navigateToQuestionsPage()"
                class="btn btn-danger"
              >Cancel</button>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script> 
import Vuex from 'vuex'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    ...Vuex.mapActions([
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
