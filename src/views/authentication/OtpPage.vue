<template>
  <AuthLayout>
    <template #card>
      <AuthCard>

        <form @submit.prevent="handleVerifyOtp">
          <h3 class="fs-18 font-weight-medium mb-4 mt-3 text-start responsive-heading">
            Check your inbox at rajesh**@gmail.com
          </h3>

          <p class="text-start fs-16 mb-2 responsive-body">Enter OTP</p>

          <v-otp-input v-model="otp" length="6" class="otp-responsive" :error="!!otpError" />
          <div class="error-container">
            <div v-if="otpError" class="text-error text-caption">{{ otpError }}</div>
          </div>

          <VueButton
            title="Verify OTP"
            classStyle="w-100"
            type="submit"
          />

          <p class="fs-16 mt-3 text-center responsive-body">Enter the OTP sent to your email to continue.</p>
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
const otp = ref("");
const otpError = ref("");

const validateOtp = (value) => {
  const otpString = Array.isArray(value) ? value.join('') : value;
  if (!otpString) return "OTP is required";
  if (!/^\d{6}$/.test(otpString)) return "OTP must be 6 digits";
  return true;
};

const handleVerifyOtp = () => {
  const otpString = Array.isArray(otp.value) ? otp.value.join('') : otp.value;
  const validation = validateOtp(otpString);
  
  if (validation === true) {
    otpError.value = "";
    router.push("/dashboard2");
  } else {
    otpError.value = validation;
  }
};
</script>

<style scoped>
.error-container {
  height: 24px;
  margin-bottom: 16px;
}
</style>
