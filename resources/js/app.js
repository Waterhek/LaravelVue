//import './bootstrap';
import '../css/app.css';
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import app from './components/app.vue';
import router from './router';

const pinia = createPinia();
createApp(app).use(router).mount('#app');
//createApp(app).use(pinia).use(router).mount('#app');
