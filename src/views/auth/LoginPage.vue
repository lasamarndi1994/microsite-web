<template>
  <AuthLayout>
    <template #card>
      <AuthCard>
        <h3 class="font-weight-medium mb-6 mt-0 text-center" :class="$vuetify.display.smAndDown ? 'fs-16' : 'fs - 18'">
          Login with Mobile Number
        </h3>
        <form @submit.prevent="handleLogin">
          <v-text-field v-model="mobile" label="Enter your mobile number" variant="outlined" density="default"
            maxlength="10" :error-messages="mobileError" class="mb-2 text-start" autocomplete="off" @input="onInput" />
          <template v-if="isMobileVerified">
            <v-text-field v-model="password" label="Password" variant="outlined" density="default"
              :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword" :error-messages="passwordError"
              class="mb-0 text-start" />
            <div class="d-flex justify-end mb-2" v-if="isPasswordSet">
              <a href="#" class="text-decoration-none text-primary fs-14 font-weight-medium"
                @click.prevent="forgotPasswordDialog = true">
                Forgot Password?
              </a>
            </div>

            <v-text-field v-if="!isPasswordSet" v-model="confirmPassword" label="Confirm Password" variant="outlined"
              density="default" :type="showConfirmPassword ? 'text' : 'password'"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword" :error-messages="confirmPasswordError"
              class="mb-2 text-start" />
          </template>


          <v-btn :disabled="loading" height="48" :loading="loading" class="text-none mb-4 btn-primary text-white "
            size="large" type="submit" block>
            {{ isMobileVerified ? (isPasswordSet ? 'Login' : 'Create Account') : 'Login' }}
          </v-btn>

          <p class="mt-3 text-center" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'"> {{ isMobileVerified ? (isPasswordSet ? 'login' : 'Create an account using your mobile number.') : 'Login in using your mobile number' }} 
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
  <v-dialog v-model="forgotPasswordDialog" max-width="400">
    <v-card class="rounded-lg pa-6 text-center">
      <v-avatar color="orange-lighten-5" size="64" class="mb-4">
        <v-icon icon="mdi-lock-reset" color="orange" size="32"></v-icon>
      </v-avatar>
      <h3 class="text-h6 font-weight-bold mb-2">Forgot Password</h3>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Contact the organization to update your password.
      </p>
      <v-btn variant="flat" block height="40" width="22" class="btn-primary text-white text-none"
        @click="forgotPasswordDialog = false">
        Okay, Got it
      </v-btn>
    </v-card>
  </v-dialog>
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
const forgotPasswordDialog = ref(false);


const isMobileVerified = ref(false);
const isPasswordSet = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordRules = computed(() => {
  return isPasswordSet.value ? 'required' : 'required|min:6|special_char';
});

const { value: mobile, errorMessage: mobileError, validate: validateMobile, setErrors: setMobileErrors, resetField: resetMobile } = useField('mobile', (value) => {
  if (!value) return 'Mobile Number is required';
  if (!/^\d+$/.test(value)) return 'Mobile Number must contain only digits';
  if (value.length < 10) return 'Mobile number should be 10 digit';
  return true;
});
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

const authLogin = async () => {
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
  if (!isMobileVerified.value) {
    await validateMobileNumber();
    return;
  }

  if (isMobileVerified.value) {
    // Password Validation Phase
    const passwordResult = await validatePassword();

    if (isPasswordSet.value) {
      // Login Flow
      if (passwordResult.valid) {
        await authLogin();
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

<style scoped></style>