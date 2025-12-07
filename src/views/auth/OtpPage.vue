<template>
  <AuthLayout>
    <template #card>
      <AuthCard>
        <form @submit.prevent="handleVerifyOtp">
          <h3 class="fw-500 mb-3 text-start" :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-18'">
            Check your inbox at rajesh**@gmail.com
          </h3>

          <p class="text-start mb-2 responsive-body" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'">Enter OTP</p>

          <v-otp-input v-model="otp" length="6" class="otp-responsive" :error="!!otpError" maxWidth="100%" />
          <div class="error-container mb-0">
            <div v-if="otpError" class="text-error text-caption">{{ otpError }}</div>
          </div>

          <div class="d-flex justify-end align-center mb-2">
            <span class="text-body-2 text-secondary-color font-weight-medium mr-2">
              Resend OTP : {{ timer }}s
            </span>
            <v-icon icon="mdi-refresh" size="small" color="secondary" class="cursor-pointer"
              :class="{ 'spin-animation': !canResend }" @click="handleResendOtp" :disabled="!canResend"></v-icon>
          </div>

          <VueButton title="Verify OTP" classStyle="w-100" type="submit" />

          <p class="mt-3 text-center responsive-body" :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-16'">Enter the OTP sent to your email to continue.</p>
        </form>

      </AuthCard>
    </template>
  </AuthLayout>
</template>

<script setup>
import { useField } from "vee-validate";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "@/components/AuthLayout.vue";
import AuthCard from "@/components/AuthCard.vue";

const router = useRouter();
const { value: otp, errorMessage: otpError, validate } = useField('otp', 'required|numeric|min:6');
const timer = ref(30);
const canResend = ref(false);
let intervalId = null;

const startTimer = () => {
  canResend.value = false;
  timer.value = 30;
  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      canResend.value = true;
      clearInterval(intervalId);
    }
  }, 1000);
};

const handleResendOtp = () => {
  if (canResend.value) {
    // Logic to resend OTP would go here
    startTimer();
  }
};

const handleVerifyOtp = async () => {
  const { valid } = await validate();

  if (valid) {
    router.push("/dashboard");
  }
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
@media (max-width: 768px) {
  .text-body-2 {
    font-size: 12px;
  }

  .text-caption {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .text-body-2 {
    font-size: 11px;
  }

  .text-caption {
    font-size: 9px;
  }
}
.error-container {
  height: 24px;
  margin-bottom: 16px;
}

/* Ensure all OTP boxes have the same height and width (square) */
:deep(.v-otp-input input) {
  height: 56px !important;
  width: 56px !important;
}
</style>