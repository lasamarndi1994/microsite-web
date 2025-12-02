import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('authToken') || null,
        isAuthenticated: !!localStorage.getItem('authToken'),
        mobile: '',
        loading: false,
    }),
    actions: {
        async sendOtp(mobile) {
      this.loading = true
      this.mobile = mobile

      await new Promise(res => setTimeout(res, 1200))

      this.loading = false
      return true
    }
    },
});