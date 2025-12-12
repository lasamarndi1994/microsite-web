<template>
  <AuthLayout>
    <template #card>
      <AuthCard>
        <h3 class="font-weight-medium mb-6 mt-0 text-center responsive-heading"
          :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-18'">
          Login with Mobile Number
        </h3>
        <form @submit.prevent="handleLogin">
          <v-text-field v-model="mobile" label="Enter your mobile number" variant="outlined" density="default"
            maxlength="10" :error-messages="mobileError" class="mb-2 text-start" autocomplete="off" @input="onInput" />
          <template v-if="isMobileVerified">
            <v-text-field v-model="password" label="Password" variant="outlined" density="default"
              :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword" :error-messages="passwordError"
              class="mb-2 text-start" />

            <v-text-field v-if="!isPasswordSet" v-model="confirmPassword" label="Confirm Password" variant="outlined"
              density="default" :type="showConfirmPassword ? 'text' : 'password'"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword" :error-messages="confirmPasswordError"
              class="mb-2 text-start" />
          </template>


          <v-btn :disabled="loading" height="44" :loading="loading" class="text-none mb-4 btn-primary text-white "
            size="large" type="submit" block>
            {{ isMobileVerified ? (isPasswordSet ? 'Login' : 'Create Account') : 'Login' }}
          </v-btn>

          <p class="mt-3 text-center" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'">Using your mobile number
            and {{ isMobileVerified ? (isPasswordSet ? 'login' : 'create account') : 'login the process' }}
          </p>

          <!-- <p class="mt-3 text-center" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'">We’ll send a verification
            code to your E-mail</p> -->
        </form>

      </AuthCard>
    </template>
  </AuthLayout>
  <v-snackbar v-model="showSuccess" color="success" timeout="3000" location="bottom center">
    {{ successMessage }}
  </v-snackbar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useField } from "vee-validate";
import { useRouter } from "vue-router";
import AuthLayout from "@/components/AuthLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import { restrictToNumbers } from "@/utils/validators";
import api from "@/api";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const store = useAuthStore();
const loading = ref(false);
const showSuccess = ref(false);
const successMessage = ref('');


const isMobileVerified = ref(false);
const isPasswordSet = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordRules = computed(() => {
  return isPasswordSet.value ? 'required' : 'required|min:6|special_char';
});

const { value: mobile, errorMessage: mobileError, validate: validateMobile, setErrors: setMobileErrors, resetField: resetMobile } = useField('mobile', 'required|numeric|min:10');
const { value: password, errorMessage: passwordError, validate: validatePassword, resetField: resetPassword, setErrors: setPasswordErrors } = useField('password', passwordRules);
const { value: confirmPassword, errorMessage: confirmPasswordError, validate: validateConfirmPassword, setErrors: setConfirmPasswordErrors, resetField: resetConfirmPassword } = useField('confirmPassword', 'required|min:6|special_char');

const onInput = async (event) => {
  const value = event.target.value;
  mobile.value = restrictToNumbers(value);

  if (mobile.value.length === 10) {
    await validateMobileNumber();
  }
};

const validateMobileNumber = async () => {
  const { valid } = await validateMobile();
  if (valid) {
    loading.value = true;

    api.post("/validate-mobile-number", { mobile_number: mobile.value })
      .then(async (response) => {
        loading.value = false;
        // If data is true, password is set. If false, password is NOT set.
        isPasswordSet.value = response.data.data === true;
        isMobileVerified.value = true;
      })
      .catch((error) => {
        loading.value = false;
        isMobileVerified.value = false;
        if (error.response && error.response.data && error.response.data.message) {
          setMobileErrors(error.response.data.message);
        }
      })
  }
};

const performLogin = async () => {
  loading.value = true;
  api.post("/auth/login", {
    mobile_number: mobile.value,
    password: password.value
  })
    .then(async (response) => {
      loading.value = false;
      if (response.data.status) {
        await store.storeToken(response.data.data);
        await router.push("/dashboard");
      }
    })
    .catch((error) => {
      loading.value = false;
      if (error.response && error.response.data.message) {
        setPasswordErrors(error.response.data.message);
      }
    });
};

const performUpdatePassword = async () => {
  loading.value = true;
  api.post("/auth/update-password", {
    mobile_number: mobile.value,
    password: password.value,
    confirm_password: confirmPassword.value
  })
    .then(async (response) => {
      loading.value = false;
      if (response.data.status) {
        successMessage.value = response.data.message || 'Password updated successfully';
        showSuccess.value = true;

        // Reset form
        resetMobile();
        resetPassword();
        resetConfirmPassword();
        isMobileVerified.value = false;
        isPasswordSet.value = false;
      }
    })
    .catch((error) => {
      loading.value = false;
      if (error.response && error.response.data.message) {
        setConfirmPasswordErrors(error.response.data.message);
      }
    });
};

const handleLogin = async () => {
  if (isMobileVerified.value) {
    // Password Validation Phase
    const passwordResult = await validatePassword();

    if (isPasswordSet.value) {
      // Login Flow
      if (passwordResult.valid) {
        await performLogin();
      }
    } else {
      // Create Account / Update Password Flow
      const confirmResult = await validateConfirmPassword();
      if (passwordResult.valid && confirmResult.valid) {
        if (password.value !== confirmPassword.value) {
          setConfirmPasswordErrors("Passwords do not match");
          return;
        }
        await performUpdatePassword();
      }
    }
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