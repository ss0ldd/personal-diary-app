import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/vue-router.js';
import './main.css'

createApp(App)
    .use(router)
    .mount('#app');
