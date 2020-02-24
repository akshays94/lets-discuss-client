<template>
    <div class="container">
        <div class="row centerify">
            <div class="form-box">
                <h3 class="text-center">Login</h3>
                <br/>
                <div class="form-group">
                    <input 
                      v-model="username"
                      type="text"
                      class="form-control"
                      id="userid"
                      placeholder="Username">
                </div>
                <div class="form-group">
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="pwd"
                      placeholder="Password">
                </div>
                <div class="align-center">
                  <button
                    @click="login()"
                    class="btn btn-primary"
                    id="login">
                    <span v-if="!isTryingLogin || isLoginAsGuest">
                      Login
                    </span>
                    <span v-if="isTryingLogin && !isLoginAsGuest">
                      <font-awesome-icon
                      :icon="['fas', 'spinner']" 
                      color="white"
                      spin /> Logging in ...
                    </span>
                    </button>
                  &nbsp;
                  
                  &nbsp;
                  <button
                      class="btn btn-outline-success"
                      @click="navigateToRegistrationPage()"
                  >Register</button>
                </div>
                <div style="margin: 12px 0; font-weight: bold;">
                  OR
                </div>
                <div>
                  <button
                    @click="loginAsGuest()"
                    class="btn btn-info form-control"
                    id="login">
                      <span v-if="!isTryingLogin">
                        Login As Guest
                      </span>
                      <span v-if="isTryingLogin && isLoginAsGuest">
                        <font-awesome-icon
                        :icon="['fas', 'spinner']" 
                        color="white"
                        spin /> Logging in ...
                      </span>
                    </button>
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
      username: '',
      password: '',
      isLoginAsGuest: false,
      isLoginBtn: true
    }
  },
  computed: {
    ...Vuex.mapGetters('AuthStore', {
      isTryingLogin: 'getIsTryingLogin'
    })
  },
  methods: {
    ...Vuex.mapActions('AuthStore', [
      'loginUser'
    ]),
    resetFields () {
      this.username = ''
      this.password = ''
    },
    login () {
      const formData = {
        username: this.username,
        password: this.password
      }
      this.resetFields()
      this.loginUser(formData)
    },
    loginAsGuest () {
      this.isLoginAsGuest = true
      const formData = {
        username: 'james.west',
        password: 'west'
      }
      this.resetFields()
      this.loginUser(formData)
    },
    navigateToRegistrationPage () {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>

<style scoped>
.container {
    height: 100vh;
}
.centerify {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form-box {
    /* border: 1px solid blue; */
    padding: 48px 84px;
    background: #efefef;
}
</style>
