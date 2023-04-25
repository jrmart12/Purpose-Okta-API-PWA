<template>
  <div class="vue-tempalte" v-if="loggedInValue">
    <div class="form-group mb-3">
      <label>First Name</label>
      <input disabled class="form-control form-control-lg" v-model="user.given_name" />
    </div>
    <div class="form-group mb-3">
      <label>Last Name </label>
      <input disabled class="form-control form-control-lg" v-model="user.family_name" />
    </div>
    <div class="form-group mb-3">
      <label>Email </label>
      <input disabled class="form-control form-control-lg" v-model="user.email" />
    </div>
  </div>
</template>

<script>
import { mapStores, mapState, mapWritableState } from 'pinia'
import useAuthStore from '@/stores/auth'
export default {
  name: 'ProfileView',
  created() {
    this.authStore.onChange = (loggedIn) => {
      this.authStore.loggedInValue = loggedIn
    }
    this.authStore.getUserInfo()
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['loggedInValue']),
    ...mapWritableState(useAuthStore, {
      modalVisibility: 'loggedInValue'
    }),
    ...mapState(useAuthStore, ['user']),
    ...mapWritableState(useAuthStore, {
      modalVisibility: 'user'
    })
  }
}
</script>
