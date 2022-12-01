import Index from '@/pages/index.vue'
import SignIn from '@/pages/sign-in.vue'
import SignUp from '@/pages/sign-up.vue'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

const protectedRoutes = ['Index']

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
  {
    path: '/sign-up',
    component: SignUp,
    name: 'SignUp'
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const isRegistered = localStorage.getItem('email')
  if (typeof to.name !== 'string') return

  if (protectedRoutes.includes(to.name) && !isRegistered) {
    next({ name: 'SignIn' })
  } else {
    next()
  }
})
