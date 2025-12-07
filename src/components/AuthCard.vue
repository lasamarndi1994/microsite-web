<template>
  <v-card
    :elevation="$vuetify.display.smAndDown ? 0 : elevation"
    class="mx-auto my-5"
    :class="$vuetify.display.smAndDown ? 'pa-4 bg-transparent' : 'pa-16'"
    :width="$vuetify.display.smAndDown ? '100%' : width"
    :height="$vuetify.display.smAndDown ? 'auto' : height"
  >
    <slot />
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
</style>
