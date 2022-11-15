import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './components/App.vue'

const main = createApp(App)

const pinia = createPinia()

main.use(pinia)

main.mount('#app')
