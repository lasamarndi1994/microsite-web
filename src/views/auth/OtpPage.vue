<template>
  <AuthLayout>
    <template #card>
      <AuthCard>
    
        <form @submit.prevent="handleVerifyOtp">
          <h3 class="fw-500 mb-3 text-start" :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-18'">
            Check your inbox at {{ store.user.email }} <span class="text-secondary-color text-caption cursor-pointer ml-2" @click="changeEmail">Change</span>
          </h3>

          <p class="text-start mb-2 responsive-body" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'">Enter OTP</p>

          <v-otp-input v-model="otp" length="6" class="otp-responsive"  maxWidth="100%" :error-messages="mobileError" />
          <div class=" mb-0">
            <div v-if="otpError" class="text-error text-caption">{{ otpError }}</div>
          </div>

          <div class="d-flex justify-end align-center mb-2">
            <span class="text-body-2 text-secondary-color font-weight-medium mr-2">
              Resend OTP : {{ timer }}s
            </span>
            <v-icon icon="mdi-refresh" size="small" color="secondary" class="cursor-pointer"
              :class="{ 'spin-animation': !canResend }" @click="handleResendOtp" :disabled="!canResend"></v-icon>
          </div>

          <v-btn
        :disabled="loading"
        :loading="loading"
         height="44"
        class="text-none mb-4 btn-primary text-white "
        size="large"
      
        type="submit"
        block
       
      >
        Verify OTP and continue
      </v-btn>

          <p class="mt-3 text-center responsive-body" :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-16'">Enter the OTP sent to your email to continue.</p>
        </form>

      </AuthCard>
    </template>
  </AuthLayout>
  <v-snackbar v-model="showSuccess" color="success" timeout="3000" location="bottom center">
    {{ successMessage }}
  </v-snackbar>
</template>

<script setup>

import { useField } from "vee-validate";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "@/components/AuthLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import api from "@/api";
import { useAuthStore } from "@/stores/authStore";

const store = useAuthStore();

const loading = ref(false);
const router = useRouter();
const { value: otp, errorMessage: otpError, validate, setErrors } = useField('otp', 'required|numeric|min:6');
const timer = ref(60);
const canResend = ref(false);
let intervalId = null;
const showSuccess = ref(false);
const successMessage = ref('');


const startTimer = () => {
  canResend.value = false;
  timer.value = 60;
  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      canResend.value = true;
      clearInterval(intervalId);
    }
  }, 1000);
};

const changeEmail = () => {
  router.back();
};

const handleResendOtp = () => {
  if (canResend.value) {
   api.post("/auth/resend-otp", { mobile_number: store.user.mobile_number.toString() })
    .then((response) => {
      if(response.data.status){
        startTimer();
        successMessage.value = response.data.message || 'OTP has been resent successfully';
        showSuccess.value = true;
      }
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        setErrors(error.response.data.message);
      }
    })
    
  }
};

const handleVerifyOtp = async () => {
  const { valid } = await validate();

  if (valid) {
    loading.value = true;
    api.post("/auth/login", { mobile_otp: otp.value,
       mobile_number: store.user.mobile_number.toString() })
    .then(async(response) => {
      if(response.data.status){
        loading.value = false;
        await store.storeToken(response.data.data);
        await router.push("/dashboard");
      }
    })
    .catch((error) => {
      loading.value = false;
      if (error.response && error.response.data && error.response.data.message) {
        setErrors(error.response.data.message);
      }
    })
   
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