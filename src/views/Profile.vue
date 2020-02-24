<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <AppHeader :title="`Profile`" />
      </div>
    </div>  
    <div class="row">
      <div class="col-sm-12">
        <table>
          <tr>
            <th>Name:</th>
            <td>{{ user.first_name }} {{ user.last_name }}</td>
          </tr>
          <tr>
            <th>Reputation:</th>
            <td>{{ user.score }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="rbox" v-for="reputation in reputations" :key="reputation.id">
          <div 
            class="rbox--score"
            :class="{ positive: reputation.points > 0 }">
            <span v-if="reputation.points > 0">+</span>{{ reputation.points }}
          </div>
          <div class="rbox--votetype">
            {{ reputation.category_txt }}
            <br>
            (<router-link :to="{ name: 'profile', params: { userId: reputation.created_by.id } }">
              {{ reputation.created_by.first_name }} {{ reputation.created_by.last_name }}
            </router-link>)
          </div>
          <div class="rbox--details">
            <div>
              <router-link :to="{ name: 'question', params: { questionId: reputation.instance.question_id } }">
                {{ reputation.instance.question_title }}
              </router-link>
            </div>
            <div>
              {{ reputation.instance.answer_content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/Header'
import axiosAppInstance from '@/axios-app'
import endpoints from '@/api-endpoints'
import Vuex from 'vuex'

export default {
  components: {
    AppHeader
  },
  data () {
    return {
      user: null,
      reputations: []
    }
  },
  created () {
    this.fetchUserDetails()
    this.fetchUserReputations()
  },
  computed: {
    ...Vuex.mapGetters('AuthStore', {
      authToken: 'getAuthToken'
    })
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'profile' && from.name === 'profile') {
        this.fetchUserDetails()
        this.fetchUserReputations()
      }
    }
  },
  methods: {
    fetchUserDetails () {
      let { url, method } = endpoints.userDetails
      url = url.replace(':userId', this.$route.params.userId)
      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${this.authToken}`
        }
      })
        .then(res => {
          this.user = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchUserReputations () {
      let { url, method } = endpoints.userReputations
      url = url.replace(':userId', this.$route.params.userId)
      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${this.authToken}`
        }
      })
        .then(res => {
          this.reputations = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
table {
  /* width: 75%; */
}
table tr {
  text-align: left;
}
td {
  padding: 12px;
}

.rbox {
  border: 1px solid lightgray;
  box-shadow: 0 2px 3px 0 lightgray;
  padding: 12px;
  display: flex;
  font-size: 0.8em;
  margin-bottom: 12px;
  text-align: left;
  width: 85%;
}

.rbox--score {
  flex-basis: 10%;
  font-weight: bolder;
  padding: 8px;
  color: red;
  text-align: center;
}

.rbox--score.positive {
  color: green;
}

.rbox--votetype {
  /* border: 1px solid; */
  flex-basis: 15%;
  padding: 8px;
  color: grey;
}
.rbox--details {
  /* border: 1px solid; */
  flex-basis: 75%;
  padding: 8px;
}
</style>
