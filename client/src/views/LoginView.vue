<template>
  <div class="vue-tempalte">
    <form @submit.prevent="login" class="d-flex flex-column">
      <h3>Sign In</h3>
      <div class="form-group mb-3">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="email" />
      </div>
      <div class="form-group mb-3">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model="pass" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
      <p class="forgot-password text-right mt-2 mb-4">
        <RouterLink to="/forgot-password">Forgot password ?</RouterLink>
      </p>
    </form>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import useAuthStore from '@/stores/auth'
export default {
  data() {
    return {
      email: '',
      pass: '',
      error: false
    }
  },
  methods: {
    login() {
      this.authStore.login(this.email, this.pass, (loggedIn) => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.authStore.getUserInfo()
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  },
  computed: {
    ...mapStores(useAuthStore)
  }
}
</script>
