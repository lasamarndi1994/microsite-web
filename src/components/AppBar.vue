<template>
    <v-app-bar flat color="white" class="border-b">
        <v-container class="d-flex align-center py-0">
            <img src="@/assets/images/logo.svg" alt="logo" :style="store.isAuthenticated ? 'cursor: pointer;' : ''"
                @click="navigateToHome">
            <v-spacer></v-spacer>
            <v-btn v-if="store.isAuthenticated" icon variant="text" color="grey-darken-1" @click="handleLogout">
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
    if (!store.isAuthenticated) {
        return;
    }
    router.push('/dashboard');
}

const handleLogout = () => {
    store.logout();
    router.push('/auth/login');
}
</script>