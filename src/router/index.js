import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/authentication/LoginPage.vue'),
  },
  {
    path: '/otp',
    name: 'Otp',
    component: () => import('@/views/OtpPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;