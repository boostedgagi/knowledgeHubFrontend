import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// createApp(App).use(router).mount('#app')
const app = createApp(App);

app.config.globalProperties.api = 'http://localhost:8000/'

app.mount('#app');