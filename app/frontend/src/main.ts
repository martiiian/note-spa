import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/routes'
import App from './components/App.vue'

const main = createApp(App)

const pinia = createPinia()

main.use(pinia)
main.use(router)

main.mount('#app')
