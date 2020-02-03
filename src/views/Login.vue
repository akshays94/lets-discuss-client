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
                <br/>
                <div class="align-center">
                    <button
                      @click="login()"
                      class="btn btn-success"
                      id="login">Login</button>
                    &nbsp;
                    <button
                        class="btn btn-primary"
                        @click="navigateToRegistrationPage()"
                    >Register</button>
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
      password: ''
    }
  },
  methods: {
    ...Vuex.mapActions([
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
