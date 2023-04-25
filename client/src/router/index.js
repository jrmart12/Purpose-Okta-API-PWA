import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ProfileView from '@/views/ProfileView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/profile',
      component: ProfileView,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/forgot-password',
      component: ForgotPasswordView
    },
    {
      path: '/logout',
      component: LoginView,
      beforeEnter(to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    console.log(!auth.loggedIn())
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
export default router
