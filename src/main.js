import vuetify from '@/plugins/vuetify';
import '@/plugins/validation';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.css';
import '@/scss/style.scss';
import AppLayout from '@/views/layout/AppLayout.vue'

const app = createApp(App);
const pinia = createPinia()

app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount('#app');
app.mixin({ components: { AppLayout } });
app.config.globalProperties.$axios = axios;