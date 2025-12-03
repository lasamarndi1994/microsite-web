import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue'),
  },
  {
    path: '/otp-verification',
    name: 'OtpPage',
    component: () => import('@/views/auth/OtpPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardPage.vue'),
  },
  {
    path: '/dashboard2',
    name: 'Dashboard2',
    component: () => import('@/views/Dashboard2Page.vue'),
  },
  {
    path: '/microsites',
    name: 'Microsites',
    component: () => import('@/views/MicrositeListPage.vue'),
  },
  {
    path: '/create-microsite',
    name: 'CreateMicrosite',
    component: () => import('@/views/CreateMicrositePage.vue'),
  },
  {
    path: '/microsite-profile',
    name: 'MicrositeProfile',
    component: () => import('@/views/MicrositeProfilePage.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;