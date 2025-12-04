<template>
  <v-container class="d-flex align-center py-5">
    <img src="@/assets/images/logo.svg" alt="logo">
    <v-spacer></v-spacer>
  </v-container>

  <v-divider></v-divider>
  <v-container fluid class="pa-0 mt-10">
    <img src="@/assets/images/bg1.svg" class="auth-bg-img left" />
    <img src="@/assets/images/23bg1.svg" class="auth-bg-img right" />

    <v-row no-gutters class="mt-10">
      <v-col cols="12" class="text-center d-flex flex-column justify-center align-center pa-4"
        style="min-height: 75vh;">
        <h1 class="font-weight-bold mb-2" :class="$vuetify.display.smAndDown ? 'text-h5' : 'text-h4'">
          Welcome to microsite Platform
        </h1>
        <p class="mb-4 mb-md-8" :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-18'">
          Create your professional microsite in minutes
        </p>

        <slot name="card"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
