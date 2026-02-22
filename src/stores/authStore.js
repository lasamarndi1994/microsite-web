import { defineStore } from 'pinia';
import router from '../router';
export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: localStorage.getItem("9M14mC") ? JSON.parse(atob(localStorage.getItem("9M14mC") || null)) : null,
        authToken: !!localStorage.getItem("RTLa{R319"),
        isAdminAuthenticated: !!localStorage.getItem("tM1hAh"),
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
            localStorage.setItem("9M14mC", btoa(JSON.stringify(user)))
            // this.storeMobile(user.mobile_number);
        },
        storeToken(token) {
            this.authToken = token
            localStorage.setItem("RTLa{R319", token)
        },

        storeAdminToken(token) {
            this.isAdminAuthenticated = token
            localStorage.setItem("tM1hAh", token)
        },
        storeMobile(mobile) {
            this.mobile = mobile
            localStorage.setItem('mobile', mobile)
        },
        logout() {
            this.user = null;
            this.authToken = null;
            this.mobile = '';
            this.isAdminAuthenticated = false;
            localStorage.removeItem("9M14mC");
            localStorage.removeItem("RTLa{R319");
            localStorage.removeItem('mobile');
            localStorage.removeItem("tM1hAh");

            router.push('/');
        }

    },
});