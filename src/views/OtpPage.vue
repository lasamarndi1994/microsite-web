<template>
    <AuthLayout>
        <v-card class="pa-4 pa-sm-8 pa-md-16 mx-auto" elevation="6" rounded="lg">
            <h2 class="text-h6 text-sm-h5 text-md-h5 font-weight-bold mb-6 text-center">
                Enter the OTP
            </h2>
            <p class="text-caption text-center mt-3 grey--text">
                Please enter the given OTP to verify your account
            </p>

            <form @submit.prevent="verifyOtp">
                <v-otp-input v-model="otp" length="6" class="mb-4" />
                <div v-if="otpError" class="text-tertiary-color text-caption text-center mb-4">
                    {{ otpError }}
                </div>

                <v-btn type="submit" class="mt-4" block color="primary" size="large" :disabled="isSubmitting">
                    Submit
                </v-btn>
            </form>
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
    otp: yup
        .string()
        .required('OTP is required')
        .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits'),
});
const { handleSubmit, isSubmitting } = useForm({
    validationSchema: schema,
});

const { value: otp, errorMessage: otpError } = useField('otp');

const verifyOtp = handleSubmit(async (values) => {
    console.log('Verifying OTP', values);
    router.push('/');
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