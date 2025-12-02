import vuetify from '@/plugins/vuetify';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.css';
import '@/scss/style.scss';
import VueButton from '@/components/VueButton.vue'

const app = createApp(App);
const pinia = createPinia()

app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount('#app');
app.mixin({ components: { VueButton } });
app.config.globalProperties.$axios = axios;