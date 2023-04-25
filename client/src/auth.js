import { OktaAuth } from '@okta/okta-auth-js'

const { VITE_CLIENT_ID, VITE_ISSUER } = import.meta.env

const authClient = new OktaAuth({
  issuer: VITE_ISSUER,
  clientId: VITE_CLIENT_ID,
  scopes: ['openid', 'email', 'profile'],
  redirectUri: window.location.origin + '/login/callback'
  // pkce: true
})

export default {
  logout(cb) {
    delete localStorage.token
    delete localStorage.idToken
    if (cb) cb()
    this.onChange(false)
    return authClient.signOut()
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}
