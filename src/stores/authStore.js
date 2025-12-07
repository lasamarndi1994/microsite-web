import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: localStorage.getItem('authUser') ? JSON.parse(atob(localStorage.getItem('authUser') || null)) : null,
        authToken: !!localStorage.getItem('authToken'),
        mobile: localStorage.getItem('mobile') || '',
    }),
    getters: {
        mobileNumber: (state) => state.mobile,

        authUser: (state) => state.user,

        isAuthenticated: (state) => state.authToken,



    },
    actions: {
        storeUser(user) {
            this.user = user;
            localStorage.setItem('authUser', btoa(JSON.stringify(user)))
            // this.storeMobile(user.mobile_number);
        },
        storeToken(token) {
            this.authToken = token
            localStorage.setItem('authToken', token)
        },
        storeMobile(mobile) {
            this.mobile = mobile
            localStorage.setItem('mobile', mobile)
        },
        logout() {
            this.user = null;
            this.authToken = null;
            this.mobile = '';
            localStorage.removeItem('authUser');
            localStorage.removeItem('authToken');
            localStorage.removeItem('mobile');
        }

    },
});