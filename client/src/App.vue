<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav
      class="navbar shadow bg-white justify-content-between flex-nowrap flex-row fixed-top navbar-light"
    >
      <div class="container">
        <RouterLink to="/">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        </RouterLink>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item navbar-item2">
            <RouterLink class="nav-link pr-3" to="/login" v-if="!loggedInValue">Sign in</RouterLink>
          </li>
          <li class="nav-item navbar-item2">
            <RouterLink class="btn btn-outline-primary" to="/register" v-if="!loggedInValue"
              >Sign up</RouterLink
            >
          </li>
          <li class="nav-item navbar-item2">
            <RouterLink class="btn btn-outline-primary" to="/logout" v-if="loggedInValue"
              >Log out</RouterLink
            >
          </li>
          <li class="nav-item navbar-item2">
            <RouterLink class="btn btn-outline-primary" to="/profile" v-if="loggedInValue"
              >Profile</RouterLink
            >
          </li>
        </ul>
      </div>
    </nav>
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <template v-if="$route.matched.length">
            <router-view></router-view>
          </template>
          <template v-else>
            <p>You are logged {{ loggedInValue ? 'in' : 'out' }}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores, mapState, mapWritableState } from 'pinia'
import useAuthStore from '@/stores/auth'
export default {
  created() {
    this.authStore.loggedIn()
    this.authStore.onChange = (loggedIn) => {
      this.authStore.loggedInValue = loggedIn
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['loggedInValue']),
    ...mapWritableState(useAuthStore, {
      modalVisibility: 'loggedInValue'
    })
  }
}
</script>
