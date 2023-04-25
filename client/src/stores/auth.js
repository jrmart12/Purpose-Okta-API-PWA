import { defineStore } from 'pinia'
import { OktaAuth } from '@okta/okta-auth-js'
import axios from 'axios'

const { VITE_CLIENT_ID, VITE_ISSUER } = import.meta.env

const authClient = new OktaAuth({
  issuer: VITE_ISSUER,
  clientId: VITE_CLIENT_ID,
  scopes: ['openid', 'email', 'profile'],
  redirectUri: window.location.origin + '/login/callback'
  // pkce: true
})
export default defineStore('auth', {
  state: () => ({
    user: {},
    loading: false,
    error: '',
    loggedInValue: false
  }),
  getters: {},
  actions: {
    login(email, pass, cb) {
      cb = arguments[arguments.length - 1]
      if (localStorage.token) {
        if (cb) cb(true)
        this.onChange(true)
        return
      }
      return authClient
        .signInWithCredentials({
          username: email,
          password: pass
        })
        .then((transaction) => {
          if (transaction.status === 'SUCCESS') {
            return authClient.token
              .getWithoutPrompt({
                responseType: "['id_token', 'token']",
                sessionToken: transaction.sessionToken
              })
              .then((response) => {
                localStorage.token = response.tokens.accessToken
                localStorage.idToken = response.tokens.idToken
                authClient.tokenManager.add('idToken', response.tokens.idToken)
                authClient.tokenManager.add('accessToken', response.tokens.accessToken)
                if (cb) cb(true)
                this.onChange(true)
              })
          }
        })
        .catch((err) => {
          console.error(err.message)
          if (cb) cb(false)
          this.onChange(false)
        })
    },

    getToken() {
      return localStorage.token
    },

    loggedIn() {
      this.loggedInValue = !!localStorage.token
    },

    logout(cb) {
      delete localStorage.token
      delete localStorage.idToken
      if (cb) cb()
      this.onChange(false)
      this.loggedIn()
      return authClient.signOut()
    },

    async getUserInfo() {
      Promise.all([
        authClient.tokenManager.get('accessToken'),
        authClient.tokenManager.get('idToken')
      ])
        .then(([accessTokenObject, idTokenObject]) => {
          return authClient.token.getUserInfo(accessTokenObject, idTokenObject)
        })
        .then((user) => {
          // user has details about the user
          console.log(user)
          this.setUserInfo(user)
        })
        .catch((err) => {
          console.error(err.message)
          this.onChange(false)
        })
    },

    setUserInfo(user) {
      console.log(user)
      this.user = user
    },
    onChange() {},

    async registerUser(email, password, firstName, lastName) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify({
        profile: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          login: email
        },
        credentials: {
          password: { value: password }
        }
      })
      if (email && password && firstName && lastName) {
        await axios
          .post('http://localhost:1337/createUser/', body, config)
          .then((result) => {
            console.log(result.data)
          })
          .catch((err) => {
            console.log(err.message)
          })
      }
    },
    async firstLoginAfterRegister(email, password) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify({
        username: email,
        password: email,
        options: {
          multiOptionalFactorEnroll: true,
          warnBeforePasswordExpired: true
        }
      })
      if (email && password) {
        await axios
          .post('http://localhost:1337/auth/primary', body, config)
          .then((result) => {
            console.log(result.data)
          })
          .catch((err) => {
            console.log(err.message)
          })
      }
    }
  }
})
