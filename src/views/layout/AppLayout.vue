<template>
    <v-app>
        <v-app-bar flat color="white" class="border-b">
        <v-container class="d-flex align-center py-0">
            <img src="@/assets/images/logo.svg" alt="logo" style="cursor: pointer;" @click="navigateToHome">
            <v-spacer></v-spacer>
            <v-btn v-if="authStore.isAuthenticated" icon variant="text" color="grey-darken-1" @click="handleLogout" >
              <v-icon>mdi-logout</v-icon>
              <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
            </v-btn>
        </v-container>
    </v-app-bar>
      <v-main class="bg-grey-lighten-5">
      <v-container class="py-8">
        <slot></slot>
      </v-container>
    </v-main>
    </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const navigateToHome = () => {
    router.push('/dashboard');
}

const handleLogout = () => {
    authStore.logout();
    router.push('/auth/login');
}
</script>