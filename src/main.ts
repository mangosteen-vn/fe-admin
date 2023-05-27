import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import '@/assets/scss/index.scss'
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App)

app.use(router)
registerPlugins(app)
app.use(pinia)
app.mount('#app')
