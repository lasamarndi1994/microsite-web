<template>
    <AuthLayout>
      <template #card>
        <AuthCard>
          <form @submit.prevent="handleSendOtp">
            <h3 class="font-weight-medium mb-8 mt-3 text-center responsive-heading" :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-18'">
              Login with Mobile Number
            </h3>

            <v-text-field v-model="mobile" label="Enter your mobile number" variant="outlined" density="default"
              maxlength="10" :error-messages="mobileError" class="mb-2 text-start"
              @input="onInput" />

            <VueButton title="Send OTP" classStyle="w-100" type="submit" />

            <p class="mt-3 text-center" :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-16'">We’ll send a verification code to your E-mail</p>
          </form>

        </AuthCard>
      </template>
    </AuthLayout>
</template>

<script setup>
import { useField } from "vee-validate";
import { useRouter } from "vue-router";
import AuthLayout from "@/components/AuthLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import { restrictToNumbers } from "@/utils/validators";

const router = useRouter();

const { value: mobile, errorMessage: mobileError, validate } = useField('mobile', 'required|numeric|min:10');

const onInput = (event) => {
  const value = event.target.value;
  mobile.value = restrictToNumbers(value);
};

const handleSendOtp = async () => {
  const { valid } = await validate();

  if (valid) {
    router.push("/otp-verification");
  }
};
</script>
