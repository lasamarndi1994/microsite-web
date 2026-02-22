<template>
    <AuthLayout>
        <template #card>
            <AuthCard>
                <form @submit.prevent="handleLogin">
                    <h3 class="text-start fw-500 mb-6 mt-0 text-center"
                        :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-20'">
                        Admin Login
                    </h3>

                    <v-text-field v-model="username" label="Username" variant="outlined" density="default"
                        autocomplete="username" prepend-inner-icon="mdi-account-outline" :error-messages="usernameError"
                        class="mb-2 text-start" />

                    <v-text-field v-model="password" label="Password" variant="outlined" density="default"
                        autocomplete="new-password" :type="showPassword ? 'text' : 'password'"
                        prepend-inner-icon="mdi-lock-outline"
                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPassword = !showPassword" :error-messages="passwordError"
                        class="mb-2 text-start" />
                    <v-btn :disabled="loading" :loading="loading" height="48"
                        class="text-none mb-4 btn-primary text-white " size="large" type="submit" block>
                        Login
                    </v-btn>
                    <p class="mt-2 text-center text-grey-darken-1"
                        :class="$vuetify.display.smAndDown ? 'fs-12' : 'fs-14'">
                        Access restricted to authorized administrators only
                    </p>
                </form>
            </AuthCard>
        </template>
    </AuthLayout>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "@/components/AuthLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";
const loading = ref(false);

const router = useRouter();
const { validate } = useForm();

const { value: username, errorMessage: usernameError } = useField('username', 'required');
const { value: password, errorMessage: passwordError, setErrors: setPasswordErrors } = useField('password', 'required');

const showPassword = ref(false);
const store = useAuthStore();

const handleLogin = async () => {
    const { valid } = await validate();

    if (valid) {
        loading.value = true;
        api.post("/admin/login", {
            email: username.value,
            password: password.value,
        })
            .then(async (response) => {
                if (response.data.status === true) {
                    await store.storeAdminToken(response.data.data);
                    await router.push("/admin/dashboard");
                }
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    setPasswordErrors(error.response.data.message);
                } else {
                    console.error(error);
                }
            })
            .finally(() => {
                loading.value = false;
            });
    }
};
</script>

<style scoped></style>