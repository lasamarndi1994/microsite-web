<template>
  <v-card
    :elevation="elevation"
    class="mx-auto my-5"
    :class="$vuetify.display.smAndDown ? 'pa-10' : 'pa-16'"
    :width="$vuetify.display.smAndDown ? '75%' : width"
    :height="height"
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
