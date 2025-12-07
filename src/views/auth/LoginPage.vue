<template>
    <AuthLayout>
      <template #card>
        <AuthCard>
          <form @submit.prevent="handleSendOtp">
            <h3 class="font-weight-medium mb-8 mt-3 text-center responsive-heading" :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-18'">
              Login with Mobile Number
            </h3>

            <v-text-field v-model="mobile" label="Enter your mobile number" variant="outlined" density="default"
              maxlength="10" :error-messages="mobileError ? [mobileError] : []" class="mb-2 text-start"
              @input="onInput" />

            <VueButton title="Send OTP" classStyle="w-100" type="submit" />

            <p class="mt-3 text-center" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'">We’ll send a verification code to your E-mail</p>
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
const router = useRouter();
const mobile = ref("");
const mobileError = ref("");

const validateMobile = (value) => {
  if (!value) return "Mobile number is required";
  if (!/^\d{10}$/.test(value)) return "Mobile number must be 10 digits";
  return true;
};

const onInput = (event) => {
  const value = event.target.value;
  mobile.value = value.replace(/\D/g, "");
};

const handleSendOtp = () => {
  const validation = validateMobile(mobile.value);

  if (validation === true) {
    mobileError.value = "";
    router.push("/otp-verification");
  } else {
    mobileError.value = validation;
  }
};
</script>
