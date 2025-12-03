<template>
  <AuthLayout>
    <template #card>
      <AuthCard>
        <form @submit.prevent="handleLogin">
          <h3 class="fs-18 text-start font-weight-medium mb-6 mt-0 text-center responsive-heading">
            Admin Login
          </h3>

          <v-text-field 
            v-model="username" 
            label="Username" 
            variant="outlined" 
            density="default"
            prepend-inner-icon="mdi-account-outline"
            :error-messages="usernameError ? [usernameError] : []" 
            class="mb-2 text-start"
          />

          <v-text-field 
            v-model="password" 
            label="Password" 
            variant="outlined" 
            density="default"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            :error-messages="passwordError ? [passwordError] : []" 
            class="mb-2 text-start"
          />

         

          <VueButton title="Login" classStyle="w-100" type="submit" />

          <p class="fs-14 mt-2 text-center text-grey-darken-1">
            Access restricted to authorized administrators only
          </p>
        </form>
      </AuthCard>
    </template>
  </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "@/components/AuthLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import VueButton from "@/components/VueButton.vue";

const router = useRouter();
const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");
const showPassword = ref(false);

const validateUsername = (value) => {
  if (!value) return "Username is required";
  if (value.length < 3) return "Username must be at least 3 characters";
  return true;
};

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  return true;
};

const handleLogin = () => {
  const usernameValidation = validateUsername(username.value);
  const passwordValidation = validatePassword(password.value);

  usernameError.value = usernameValidation === true ? "" : usernameValidation;
  passwordError.value = passwordValidation === true ? "" : passwordValidation;

  if (usernameValidation === true && passwordValidation === true) {
    // TODO: Add actual authentication logic here
    console.log("Login attempt:", { username: username.value, password: password.value });
    
    // For now, redirect to admin dashboard
    router.push("/admin/dashboard");
  }
};
</script>
