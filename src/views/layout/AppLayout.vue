<template>
  <v-app>
    <AppBar />
    <v-main class="bg-grey-lighten-5">
      <v-container class="py-8">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

import AppBar from '@/components/AppBar.vue';


</script>