<template>
  <AuthLayout>
    <template #card>
      <AuthCard>
        <form @submit.prevent="handleLogin">
          <h3 class="font-weight-medium mb-8 mt-3 text-center responsive-heading"
            :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-18'">
            Login with Mobile Number
          </h3>

          <v-text-field v-model="mobile" label="Enter your mobile number" variant="outlined" density="default"
            maxlength="10" :error-messages="mobileError" class="mb-2 text-start" autocomplete="off" @input="onInput" />

          <template v-if="isMobileVerified">
            <v-text-field v-model="password" label="Password" variant="outlined" density="default"
              :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword" :error-messages="passwordError"
              class="mb-2 text-start" />

            <v-text-field v-model="confirmPassword" label="Confirm Password" variant="outlined" density="default"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword" :error-messages="confirmPasswordError"
              class="mb-2 text-start" />
          </template>


          <v-btn :disabled="loading" height="44" :loading="loading" class="text-none mb-4 btn-primary text-white "
            size="large" type="submit" block>
            Login
          </v-btn>

          <p class="mt-3 text-center" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'">Using your mobile number
            and login
            the process</p>

          <!-- <p class="mt-3 text-center" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'">We’ll send a verification
            code to your E-mail</p> -->
        </form>

      </AuthCard>
    </template>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
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


const isMobileVerified = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const { value: mobile, errorMessage: mobileError, validate: validateMobile, setErrors: setMobileErrors } = useField('mobile', 'required|numeric|min:10');
const { value: password, errorMessage: passwordError, validate: validatePassword } = useField('password', 'required|min:6|special_char');
const { value: confirmPassword, errorMessage: confirmPasswordError, validate: validateConfirmPassword, setErrors: setConfirmPasswordErrors } = useField('confirmPassword', 'required|min:6|special_char');

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
        if (response.data.status) {
          loading.value = false;
          // Instead of routing immediately, show password fields
          isMobileVerified.value = true;
        }
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

const handleLogin = async () => {
  if (isMobileVerified.value) {
    // Password Validation Phase
    const passwordResult = await validatePassword();
    const confirmResult = await validateConfirmPassword();

    if (passwordResult.valid && confirmResult.valid) {
      if (password.value !== confirmPassword.value) {
        setConfirmPasswordErrors("Passwords do not match");
        return;
      }

      // Proceed with Login Logic (Placeholder)
      console.log("Login with password:", password.value);
      // store.loginWithPassword(...) 
    }
  }
};


</script>
