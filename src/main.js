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

import { createHead } from '@unhead/vue/client';

const app = createApp(App);
const pinia = createPinia()
const head = createHead();

app.use(router);
app.use(vuetify);
app.use(pinia);
app.use(head);
app.mount('#app');
app.mixin({ components: { AppLayout } });
app.config.globalProperties.$axios = axios;