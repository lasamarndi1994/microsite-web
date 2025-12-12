<template>
  <v-card :elevation="$vuetify.display.smAndDown ? 0 : elevation" class="mx-auto my-2 auth-card"
    :class="$vuetify.display.smAndDown ? 'pa-4 bg-transparent' : 'pa-16'">
    <slot></slot>
  </v-card>
</template>

<script setup>

</script>

<style scoped>
.auth-card {

  width: 650px !important;
}

/* Ultra-Short Screens (Max Height 600px) e.g. 1265x551 */
@media (max-width: 767px) {
  .auth-card {
    width: 100% !important;
  }
}

/* } */
</style>
