<template>
    <div class="container">
        <div class="row centerify">
            <div class="form-box">
                <h3 class="text-center">Registration</h3>
                <br/>
                <div class="form-group">
                    <input 
                      v-model="firstname"
                      type="text" 
                      class="form-control" 
                      id="firstname" 
                      placeholder="Firstname">
                </div>
                <div class="form-group">
                    <input 
                      v-model="lastname"
                      type="text"
                      class="form-control"
                      id="lastname"
                      placeholder="Lastname">
                </div>
                <div class="form-group">
                    <input
                      v-model="email"
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Email ID">
                </div>
                <div class="form-group">
                    <input
                      v-model="username"
                      type="text"
                      class="form-control"
                      id="username"
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
                      @click="register()"
                      class="btn btn-success"
                    >Register</button>
                    &nbsp;
                    <button
                      @click="navigateToLoginPage()"
                      class="btn btn-danger"
                    >Cancel</button>
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
      firstname: '',
      lastname: '',
      email: ''
    }
  },
  methods: {
    ...Vuex.mapActions('AuthStore', [
      'registerUser'
    ]),
    navigateToLoginPage () {
      this.$router.push({ name: 'login' })
    },
    resetFields () {
      this.username = ''
      this.password = ''
      this.firstname = ''
      this.lastname = ''
      this.email = ''
    },
    register () {
      const formData = {
        username: this.username,
        password: this.password,
        first_name: this.firstname,
        last_name: this.lastname,
        email: this.email
      }
      this.resetFields()
      this.registerUser(formData)
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
