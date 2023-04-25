<script>
import { mapStores, mapState, mapWritableState } from 'pinia'
import useAuthStore from '@/stores/auth'
export default {
  name: 'HomeView',
  data: function () {
    return {
      resourceServerExamples: [
        {
          label: 'Purpose Website',
          url: 'https://www.havepurpose.com/'
        }
      ]
    }
  },
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

<template>
  <main>
    <h1>Purpose Financial</h1>
    <div v-if="loggedInValue">
      <h2>We are Purpose Financial.</h2>
      <p>
        An innovative consumer financial services company dedicated to improving financial mobility.
      </p>
      <p>
        An innovative consumer financial services company dedicated to improving financial mobility.
      </p>
    </div>
    <div v-if="loggedInValue">
      <p>Welcome back, {{ user.name }}!</p>
      <p>Get to know us a little more on our website</p>
      <ul>
        <li v-for="(example, index) in resourceServerExamples" :key="index">
          <a :href="example.url">{{ example.label }}</a>
        </li>
      </ul>
    </div>
  </main>
</template>
