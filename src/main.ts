import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(router)
registerPlugins(app)
app.mount('#app')
