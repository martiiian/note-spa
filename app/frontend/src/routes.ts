import Index from '@/pages/index.vue'
import SignIn from '@/pages/sign-in.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Index,
    name: 'Index'
  },
  {
    path: '/sign-in',
    component: SignIn,
    name: 'SignIn'
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})
