import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  {
    path: '/',
    redirect: '/auth/login',

  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { guest: true },
  },
  {
    path: '/otp-verification',
    name: 'OtpPage',
    component: () => import('@/views/auth/OtpPage.vue'),
    meta: { guest: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/create-microsite',
    name: 'CreateMicrosite',
    component: () => import('@/views/CreateMicrositePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/update-microsite-profile/:uuid',
    name: 'UpdateMicrositeProfile',
    component: () => import('@/views/CreateMicrositePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/auth/AdminLoginPage.vue'),
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/partner-details',
    name: 'PartnerDetails',
    component: () => import('@/views/admin/PartnerDetails.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/microsite-review',
    name: 'MicrositeReview',
    component: () => import('@/views/admin/MicrositeReview.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:username/:slug',
    name: 'MicrositeProfile',
    component: () => import('@/views/MicrositeProfilePage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
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
    next('/auth/login');
  }
  else if (to.meta.guest && authStore.isAuthenticated) {
    next('/dashboard');
  }
  else {
    next();
  }
});

export default router;