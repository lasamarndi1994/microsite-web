<template>
  <v-app>
    <v-main class="d-flex align-center justify-center"
      style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6" class="text-center">
            <v-card class="rounded-xl pa-8 pa-md-12" elevation="8">
              <div class="mb-6">
                <h1 class="display-1 font-weight-bold mb-2" style="font-size: 120px; color: var(--secondary-color);">404
                </h1>
                <h2 class="text-h4 font-weight-bold mb-4 text-grey-darken-3">Page Not Found</h2>
                <p class="text-body-1 text-grey mb-8">
                  Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
              </div>
              <v-icon icon="mdi-file-question-outline" size="100" color="grey-lighten-2" class="mb-6"></v-icon>
              <div class="d-flex flex-column flex-sm-row align-center justify-center" style="gap: 16px;">
                <v-btn class="btn-primary text-white text-capitalize" type="button" prepend-icon="mdi-home" height="48"
                  flat to="/" size="large">
                  Go to Home
                </v-btn>
                <!-- <v-btn variant="outlined" class="text-secondary-color text-capitalize"
                  style="border-color: var(--secondary-color);" prepend-icon="mdi-arrow-left" height="48"
                  @click="$router.back()" size="large">
                  Go Back
                </v-btn> -->
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.display-1 {
  line-height: 1;
}
</style>
