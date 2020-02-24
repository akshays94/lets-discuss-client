<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <AppHeader :title="`Leaderboard`" />
      </div>
    </div>  
    <div class="row">
      <div class="col-sm-12">
        <table class="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in board.results" :key="row.id">
              <td>{{ index + 1 }}</td>
              <td>
                <router-link :to="{ name: 'profile', params: { userId: row.user.id } }">
                  {{ row.user.first_name }} {{ row.user.last_name }}
                </router-link>
              </td>  
              <td>{{ row.score }}</td>
            </tr>
          </tbody>
        </table>
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
      board: []
    }
  },
  created () {
    this.fetchLeaderboard()
  },
  computed: {
    ...Vuex.mapGetters('AuthStore', {
      authToken: 'getAuthToken'
    })
  },
  methods: {
    fetchLeaderboard () {
      let { url, method } = endpoints.leaderboard
      url = url.replace(':userId', this.$route.params.userId)
      axiosAppInstance({
        method,
        url,
        headers: {
          Authorization: `Token ${this.authToken}`
        }
      })
        .then(res => {
          this.board = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
</style>
