<template>
    <v-app-bar flat color="white" class="border-b">
        <v-container class="d-flex align-center py-0">
            <img src="@/assets/images/logo.svg" alt="logo" style="cursor: pointer;" @click="navigateToHome">
            <v-spacer></v-spacer>
        </v-container>
    </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const navigateToHome = () => {
    router.push('/dashboard2');
}
</script>