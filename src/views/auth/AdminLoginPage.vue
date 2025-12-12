<template>
  <AuthLayout>
    <template #card>
      <AuthCard>
        <form @submit.prevent="handleLogin">
          <h3 class="text-start fw-500 mb-6 mt-0 text-center responsive-heading"
            :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-20'">
            Admin Login
          </h3>

          <v-text-field v-model="username" label="Username" variant="outlined" density="default"
            prepend-inner-icon="mdi-account-outline" :error-messages="usernameError" class="mb-2 text-start" />

          <v-text-field v-model="password" label="Password" variant="outlined" density="default"
            :type="showPassword ? 'text' : 'password'" prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword" :error-messages="passwordError"
            class="mb-2 text-start" />

          <v-btn :disabled="loading" :loading="loading" height="44" class="text-none mb-4 btn-primary text-white "
            size="large" type="submit" block>
            Login
          </v-btn>

          <p class="mt-2 text-center text-grey-darken-1" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-14'">
            Access restricted to authorized administrators only
          </p>
        </form>
      </AuthCard>
    </template>
  </AuthLayout>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "@/components/AuthLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";
import { email } from "@vee-validate/rules";
const loading = ref(false);

const router = useRouter();
const { validate } = useForm();

const { value: username, errorMessage: usernameError } = useField('username', 'required');
const { value: password, errorMessage: passwordError, setErrors: setPasswordErrors } = useField('password', 'required');

const showPassword = ref(false);
const store = useAuthStore();

const handleLogin = async () => {
  const { valid } = await validate();

  if (valid) {
    loading.value = true;
    api.post("/admin/login", {
      email: username.value,
      password: password.value,
    })
      .then(async (response) => {
        if (response.data.status === true) {
          await store.storeAdminToken(response.data.data);
          await router.push("/admin/dashboard");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setPasswordErrors(error.response.data.message);
        } else {
          console.error(error);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>

<style scoped>
@media (max-height: 600px) {

  /* Reduce heading size and margins */
  :deep(.responsive-heading) {
    font-size: 14px !important;
    margin-bottom: 18px !important;
    margin-top: -20px !important;
  }

  /* Compact Text Fields - Adjusted for visibility */
  :deep(.v-text-field .v-field__input) {
    min-height: 48px !important;
    /* Increased height for placeholder visibility */
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    font-size: 14px !important;
    opacity: 1 !important;
    /* Ensure placeholder opacity */
  }

  :deep(.v-text-field .v-field__outline) {
    --v-field-padding-top: 4px !important;
    /* Reduced to centre content */
    --v-field-padding-bottom: 4px !important;
  }

  :deep(.v-label) {
    font-size: 13px !important;
    top: 50% !important;
    /* Center label */
    transform: translateY(-50%) !important;
  }

  :deep(.v-label.v-label--active) {
    top: 0 !important;
    transform: translateY(-50%) scale(0.8) !important;
  }

  /* Reduce margin between inputs */
  :deep(.v-input) {
    margin-bottom: 4px !important;
  }

  /* Compact Button */
  :deep(.v-btn--size-large) {
    height: 40px !important;
    font-size: 13px !important;
    margin-bottom: 8px !important;
  }

  /* Compact Footer Text */
  p {
    margin-top: 4px !important;
    font-size: 11px !important;
  }
}
</style>