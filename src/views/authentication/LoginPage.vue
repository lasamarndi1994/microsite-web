<template>
  <AuthLayout>
    <v-card class="pa-4 pa-sm-8 pa-md-16 mx-auto" elevation="6" rounded="lg">
      <h2 class="text-h6 text-sm-h5 text-md-h5 font-weight-bold mb-6 text-center">
        Login with Mobile Number
      </h2>

      <form @submit.prevent="sendOtp">
        <v-text-field v-model="mobile" label="Enter your mobile number" variant="outlined" density="comfortable"
          maxlength="10" type="tel" class="mb-4" :error-messages="mobileError" />

        <v-btn type="submit" class="mt-4" block color="primary" size="large" :disabled="isSubmitting">
          Send OTP
        </v-btn>
      </form>

      <p class="text-caption text-center mt-3 grey--text">
        We’ll send a verification code to your mobile
      </p>
    </v-card>
  </AuthLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import AuthLayout from '@/components/AuthLayout.vue';

const router = useRouter();

const schema = yup.object({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: mobile, errorMessage: mobileError } = useField('mobile');

const sendOtp = handleSubmit(async (values) => {
  console.log('OTP sent successfully!', values);
  router.push('/otp');
});
</script>

<style scoped>
.v-card {
  width: 600px;
  max-width: 600px;
}

@media (max-width: 1300px) {
  .v-card {
    padding: 40px !important;
    margin-top: 15px;
    width: 400px !important;
    max-width: 400px !important;
  }
}

@media (max-width: 960px) {
  .v-card {
    padding: 40px !important;
    margin-top: 15px;
    width: 500px !important;
    max-width: 500px !important;
  }
}

@media (max-width: 599px) {
  .v-card {
    padding: 52px !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>