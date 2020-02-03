<template>
  <div class="home">
    
    <!-- Navigation bar -->
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Let's Discuss</a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <!-- Content here -->
      <div class="row">
        <div class="col-sm-12">
          <div>Questions ({{ questions.length }})</div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div
            class="q-box"
            v-for="question in questions"
            :key="question.id">
            <!-- <div class="q-box--vote-action">
              <arrow-up-bold-icon title="this is an icon!" :size="100" />
              <ArrowDownBoldIcon/>
            </div> -->
            <div class="q-box--details">
              <div class="q-box--details--title">
                {{ question.title }}
              </div>    
              <div class="q-box--details--content">
                {{ question.content }}
              </div>
              <div class="q-box--details--askedby">
                Asked by <a href="">{{ question.created_by }}</a>
              </div>
              <div class="q-box--details--actions">
                <a href="">Upvote</a>&nbsp;&nbsp;
                <a href="">Downvote</a>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script> 

export default {
  components: {
  },
  data () {
    return {
      questions: [
        {
          'id': 1,
          'title': 'Which is better, Python or JS?',
          'content': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptatibus blanditiis vero iure, laboriosam aperiam sapiente et consequuntur rem saepe ab quod aut nihil dolorem laborum eligendi temporibus atque modi!',
          'created_by': 'Aaron Apple'
        },
        {
          'id': 2,
          'title': 'Which is better, Python or JS?',
          'content': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptatibus blanditiis vero iure, laboriosam aperiam sapiente et consequuntur rem saepe ab quod aut nihil dolorem laborum eligendi temporibus atque modi!',
          'created_by': 'Aaron Apple'
        },
        {
          'id': 3,
          'title': 'Which is better, Python or JS?',
          'content': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptatibus blanditiis vero iure, laboriosam aperiam sapiente et consequuntur rem saepe ab quod aut nihil dolorem laborum eligendi temporibus atque modi!',
          'created_by': 'Aaron Apple'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  /* border: 1px solid red; */
  padding: 24px;
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
