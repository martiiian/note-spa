import Index from '@/pages/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Index,
    name: 'Index'
  }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})
