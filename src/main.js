import storeConfig from './store'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './components/App.vue'

const main = createApp(App)

const store = createStore(storeConfig)

main.use(store)

main.mount('#app')
