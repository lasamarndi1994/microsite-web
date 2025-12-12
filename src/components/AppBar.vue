<template>
    <v-app-bar flat color="white" class="border-b">
        <v-container class="d-flex align-center py-0">
            <img src="@/assets/images/logo.svg" alt="logo"
                :style="(store.isAuthenticated || store.isAdminAuthenticated) ? 'cursor: pointer;' : ''"
                @click="navigateToHome">
            <v-spacer></v-spacer>
            <v-btn v-if="store.isAuthenticated || store.isAdminAuthenticated" icon variant="text" color="grey-darken-1"
                @click="handleLogout">
                <v-icon>mdi-logout</v-icon>
                <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
            </v-btn>
        </v-container>
    </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
const router = useRouter();
const store = useAuthStore();

const navigateToHome = () => {
    if (store.isAdminAuthenticated) {
        router.push('/admin/dashboard');
        return;
    }
    if (!store.isAuthenticated) {
        return;
    }
    router.push('/dashboard');
}

const handleLogout = () => {
    const isAdmin = store.isAdminAuthenticated;
    store.logout();
    if (isAdmin) {
        router.push('/admin/login');
    } else {
        router.push('/auth/login');
    }
}
</script>