<template>
  <div class="home">
    
    <!-- Navigation bar -->
    <AppNavBar 
      :name="name"/>

    <div class="container">
      <!-- Content here -->
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="page-footer font-small blue pt-4">
      <div class="footer-copyright text-center py-3">© {{ new Date().getFullYear() }}:
        Made by Akshay
      </div>
    </footer>

  </div>
</template>

<script>
import Vuex from 'vuex'
import AppNavBar from '@/components/layout/NavBar'
export default {
  components: {
    AppNavBar
  },
  computed: {
    ...Vuex.mapGetters('AuthStore', {
      name: 'getName' 
    })
  }
}
</script>

<style scoped>
.container {
  /* border: 1px solid red; */
  padding: 24px;
}
</style>
