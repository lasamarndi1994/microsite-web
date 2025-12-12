<template>
  <v-card :elevation="$vuetify.display.smAndDown ? 0 : elevation" class="mx-auto my-2 auth-card"
    :class="$vuetify.display.smAndDown ? 'pa-4 bg-transparent' : 'pa-16'"
    :width="$vuetify.display.smAndDown ? '100%' : width" :min-height="$vuetify.display.smAndDown ? 'auto' : height">
    <slot></slot>
  </v-card>
</template>

<script setup>
defineProps({
  width: { type: String, default: "650px" },
  height: { type: String, default: "380px" },
  elevation: { type: Number, default: 5 },
});
</script>

<style scoped>
.auth-card {

  /* Standard Laptop (960px - 1400px) */
  @media (min-width: 960px) and (max-width: 1400px) {
    width: 500px !important;
    min-height: auto !important;
  }

  /* Short Vertical Screens (Max Height 850px) */
  @media (max-height: 850px) and (min-width: 960px) {
    width: 500px !important;
    min-height: auto !important;
  }

  /* Ultra-Short Screens (Max Height 600px) e.g. 1265x551 */
  @media (max-height: 600px) {
    padding: 50px 24px 24px !important;
    /* increased vertical padding again */
    width: 100% !important;
    max-width: 650px !important;
    margin-top: 4px !important;
    margin-bottom: 8px !important;
    min-height: auto !important;
  }
}
</style>
