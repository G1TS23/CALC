

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MyCalculator from '@/components/MyCalculator.vue'

const app = createApp(App)

app.use(router)

app
.component('MyCalculator', MyCalculator)
.mount('#app')
