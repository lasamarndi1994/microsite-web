<template>
    <v-app>
        <v-app-bar flat color="white" class="border-b">
        <v-container class="d-flex align-center py-0">
            <img src="@/assets/images/logo.svg" alt="logo" style="cursor: pointer;" @click="navigateToHome">
            <v-spacer></v-spacer>
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
const router = useRouter();

const navigateToHome = () => {
    router.push('/dashboard');
}
</script>