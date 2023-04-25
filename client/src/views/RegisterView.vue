<template>
  <div class="vue-tempalte">
    <form autocomplete="off" class="d-flex flex-column" @submit.prevent="signUp">
      <h3>Sign Up</h3>
      <div class="form-group mb-3">
        <label>First Name</label>
        <input type="text" class="form-control form-control-lg" v-model="firstName" />
      </div>
      <div class="form-group mb-3">
        <label>Last Name</label>
        <input type="text" class="form-control form-control-lg" v-model="lastName" />
      </div>
      <div class="form-group mb-3">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="email" />
      </div>
      <div class="form-group mb-3">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model="password" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
      <p class="forgot-password text-right">
        Already registered
        <RouterLink to="/login">sign in?</RouterLink>
      </p>
    </form>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import useAuthStore from '@/stores/auth'

export default {
  name: 'RegisterView',
  data: function () {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: ''
    }
  },
  methods: {
    async signUp() {
      try {
        this.authStore
          .registerUser(this.email, this.password, this.firstName, this.lastName)
          .then(() => {
            this.authStore.login(this.email, this.password, (loggedIn) => {
              if (!loggedIn) {
                this.error = true
              } else {
                this.authStore.getUserInfo()
                this.$router.replace(this.$route.query.redirect || '/')
              }
            })
          })
      } catch (error) {
        this.error = error
        console.log(error)
      }
    }
  },
  computed: {
    ...mapStores(useAuthStore)
  }
}
</script>
