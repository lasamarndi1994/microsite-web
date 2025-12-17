<template>
    <v-app>
        <AppBar :isAuthenticated="store.isAuthenticated" />
        <v-main class="bg-white">
            <div v-if="loading">
                <v-skeleton-loader color="grey-lighten-4" height="300" type="image"></v-skeleton-loader>
                <v-container class="py-8" style="max-width: 1000px;">
                    <!-- Profile Header Skeleton -->
                    <div class="profile-header-wrapper mb-8">
                        <v-card class="rounded-xl pa-8" elevation="0" border>
                            <div class="d-flex flex-column align-center">
                                <v-skeleton-loader type="avatar" height="140" width="140"
                                    class="mb-6 rounded-circle"></v-skeleton-loader>
                                <v-skeleton-loader type="heading" width="200" class="mb-4"></v-skeleton-loader>
                                <v-skeleton-loader type="text" width="300" class="mb-6"></v-skeleton-loader>
                                <v-skeleton-loader type="button" width="140" height="48"
                                    class="rounded-pill"></v-skeleton-loader>
                            </div>
                        </v-card>
                    </div>

                    <!-- About Skeleton -->
                    <div class="mb-8">
                        <v-skeleton-loader type="heading" width="120" class="mb-4"></v-skeleton-loader>
                        <v-skeleton-loader type="text@3" class="border rounded-lg pa-4"></v-skeleton-loader>
                    </div>

                    <!-- Services Skeleton -->
                    <div class="mb-8">
                        <v-skeleton-loader type="heading" width="120" class="mb-4"></v-skeleton-loader>
                        <div class="d-flex gap-3">
                            <v-skeleton-loader type="chip" width="120" v-for="n in 3" :key="n"></v-skeleton-loader>
                        </div>
                    </div>

                    <!-- Connect Skeleton -->
                    <div class="mb-8">
                        <v-skeleton-loader type="heading" width="150" class="mb-6"></v-skeleton-loader>
                        <v-row>
                            <v-col cols="4" sm="4" md="auto" v-for="n in 4" :key="n" class="d-flex justify-center">
                                <div class="d-flex flex-column align-center">
                                    <v-skeleton-loader type="avatar" size="large" class="mb-2"></v-skeleton-loader>
                                    <v-skeleton-loader type="text" width="60"></v-skeleton-loader>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
            </div>
            <div v-else-if="microsite">
                <!-- Banner Section -->
                <div class="banner-container position-relative">
                    <v-img :src="getImage(microsite.banner_image, 'uploads/banner/')" cover height="300"
                        class="align-center">
                        <div class="d-flex fill-height align-center justify-center">
                            <div class="text-center text-white px-4" style="max-width: 800px;">
                                <h2 class="font-weight-medium mb-2" style="line-height: 1.4;"
                                    :class="$vuetify.display.smAndDown ? 'text-h6' : 'text-h5'">
                                    {{ microsite.title }}
                                </h2>
                                <p class="font-weight-medium fs-10"
                                    :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">
                                    {{ microsite.sub_title }}
                                </p>
                            </div>
                        </div>
                        <!-- Overlay for better text readability -->
                        <div class="position-absolute top-0 left-0 w-100 h-100"
                            style="background: rgba(0, 0, 0, 0.2); z-index: 0;"></div>
                        <!-- Content needs higher z-index -->
                        <div class="position-absolute top-0 left-0 w-100 h-100 d-flex align-center justify-center"
                            style="z-index: 1;">
                            <div class="text-center text-white px-4" style="max-width: 800px;">
                                <h2 class="font-weight-medium mb-2" style="line-height: 1.4;"
                                    :class="$vuetify.display.smAndDown ? 'text-h6' : 'text-h5'">
                                    {{ microsite.title }}
                                </h2>
                                <p class="font-weight-medium fs-10"
                                    :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">
                                    {{ microsite.sub_title }}
                                </p>
                            </div>
                        </div>
                    </v-img>
                </div>

                <v-container class="py-8" style="max-width: 1000px;">
                    <!-- Profile Header -->
                    <div class="profile-header-wrapper mb-8">
                        <v-card class="profile-header-card rounded-xl overflow-visible" elevation="0">
                            <div class="profile-gradient-bg"></div>
                            <div class="profile-content pa-6 pa-md-8">
                                <!-- Avatar Section -->
                                <div class="text-center mb-6">
                                    <div class="avatar-wrapper d-inline-block position-relative">
                                        <v-avatar size="140" class="profile-avatar elevation-8">
                                            <v-img
                                                :src="getImage(microsite.avatar_icon, 'uploads/avatar/') || 'https://randomuser.me/api/portraits/men/5.jpg'"
                                                cover></v-img>
                                        </v-avatar>
                                        <div class="avatar-ring"></div>
                                    </div>
                                </div>

                                <!-- Name & Info Section -->
                                <div class="text-center mb-6">
                                    <h1 class="profile-name font-weight-bold mb-3"
                                        :class="$vuetify.display.smAndDown ? 'text-h5' : 'text-h4'">{{
                                            microsite.full_name }}</h1>
                                    <div
                                        class="profile-info d-flex flex-column flex-sm-row align-center justify-center gap-2">
                                        <!-- Assuming business info is not yet in API response based on provided context, keeping logic robust or hidden if missing -->
                                        <div class="d-flex align-center">
                                            <v-icon size="20" color="deep-purple-accent-2"
                                                class="mr-2">mdi-office-building</v-icon>
                                            <span class="text-grey-darken-2"
                                                :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">{{
                                                    microsite.business_name }}
                                            </span>
                                        </div>
                                        <span class="d-none d-sm-inline text-grey-lighten-1 mx-2">•</span>
                                        <div class="d-flex align-center">
                                            <v-icon size="20" color="deep-purple-accent-2"
                                                class="mr-2">mdi-map-marker</v-icon>
                                            <span class="text-grey-darken-2"
                                                :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">{{
                                                    microsite.location }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action Button -->
                                <div class="text-center">
                                    <v-btn color="deep-purple-accent-2"
                                        class="join-btn text-capitalize text-white px-8 elevation-4" height="50"
                                        rounded="pill" flat @click="clickButton">
                                        <template v-slot:prepend>
                                            <v-icon size="24">mdi-handshake-outline</v-icon>
                                        </template>
                                        Join me
                                    </v-btn>
                                </div>
                            </div>
                        </v-card>
                    </div>

                    <!-- About Section -->
                    <div class="mb-8">
                        <h2 class="text-h6 font-weight-bold mb-4">About</h2>

                        <p class="border rounded-lg pa-6 text-grey-darken-3 mb-0 mt-0 p-0 m-0"
                            :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'"
                            v-html="microsite.description" style="white-space: pre-wrap;"></p>
                    </div>

                    <!-- Services Section -->
                    <div class="mb-8" v-if="microsite.services && microsite.services.length">
                        <h2 class="text-h6 font-weight-bold mb-4">Services</h2>
                        <div class="d-flex flex-wrap gap-3">
                            <v-chip v-for="(service, index) in microsite.services" :key="index"
                                class="custom-chip bg-deep-purple-accent-2 text-white" label size="large">
                                {{ service.name }}
                            </v-chip>
                        </div>
                    </div>

                    <!-- Connect with me Section -->
                    <div class="mb-8" v-if="microsite.social_links && microsite.social_links.length">
                        <h2 class="text-h6 font-weight-bold mb-6">Connect with me</h2>
                        <v-row>
                            <v-col cols="4" sm="4" md="auto" class="d-flex justify-center"
                                v-for="(social, index) in microsite.social_links" :key="index">
                                <div class="d-flex flex-column align-center text-center">
                                    <!-- Simple icon mapping or default -->
                                    <v-btn :color="getSocialColor(social.name)" size="x-large" variant="text"
                                        class="mb-2 social-icon rounded-lg" :href="social.url" target="_blank"
                                        style="min-width: 52px; width: 52px; padding: 0;">
                                        <div :style="{
                                            width: '30px',
                                            height: '30px',
                                            overflow: 'hidden',
                                            display: 'inline-block'
                                        }">
                                            <img :src="getSocialIcon(social.name)" :style="{
                                                width: '100%',
                                                height: '100%',
                                                transform: 'translateY(-100%)',
                                                filter: `drop-shadow(0 30px 0 ${getSocialColor(social.name)})`
                                            }" />
                                        </div>
                                    </v-btn>
                                    <a :href="social.url" target="_blank"
                                        class="text-caption text-decoration-underline text-grey-darken-3 text-truncate"
                                        style="max-width: 120px;">
                                        {{ social.url }} {{ social.name }}
                                    </a>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
            </div>
        </v-main>
        <!-- Join Me Dialog -->
        <v-dialog v-model="showJoinDialog" max-width="600" location="center" scroll-strategy="none">
            <v-card class="rounded-lg pa-0 overflow-hidden">
                <!-- Banner & Avatar Section -->
                <div class="position-relative mb-12">
                    <v-img :src="getImage(microsite.banner_image, 'uploads/banner/')" cover height="100">
                        <v-btn icon="mdi-close" variant="flat" color="white"
                            class="text-red position-absolute top-0 right-0 ma-2" density="compact"
                            @click="showJoinDialog = false"></v-btn>
                    </v-img>
                    <div class="position-absolute" style="bottom: -40px; left: 24px;">
                        <v-avatar size="80" class="border-2 border-white">
                            <v-img :src="getImage(microsite.avatar_icon, 'uploads/avatar/')" cover></v-img>
                        </v-avatar>
                    </div>
                </div>

                <div class="px-6 pb-6">
                    <div class="mb-6">
                        <h3 class="text-h6 font-weight-bold">Join me</h3>
                    </div>

                    <div class="mb-4">
                        <v-text-field v-model="name" label="Name" variant="outlined" density="comfortable"
                            maxlength="100" hide-details="auto" class="mb-5" :error-messages="nameError"
                            @keypress="isName($event)"></v-text-field>

                        <v-text-field v-model="mobile" label="Mobile Number" variant="outlined" density="comfortable"
                            maxlength="10" hide-details="auto" class="mb-5" :error-messages="mobileError"
                            @keypress="isNumber($event)"></v-text-field>

                        <v-text-field v-model="email" label="E-mail Address" placeholder="Ex : ajru@gmail.com"
                            variant="outlined" density="comfortable" hide-details="auto" class="mb-5" maxlength="100"
                            :error-messages="emailError"></v-text-field>
                    </div>

                    <v-btn block color="deep-purple-accent-2" size="large" :disabled="!isSiteActive"
                        class="text-capitalize text-white rounded-lg mb-6" flat height="48" @click="handleJoin"
                        :loading="joinLoading">
                        Join Now
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="showSuccess" color="success" timeout="3000" location="bottom center">
            {{ successMessage }}
        </v-snackbar>
    </v-app>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppBar from '@/components/AppBar.vue'
import { useField, useForm } from 'vee-validate'
import api from '@/api'
import { getImage, getSocialIcon, getSocialColor } from '@/utils/helpers'
import { useAuthStore } from '@/stores/authStore'
import { useHead } from '@unhead/vue'


const store = useAuthStore()

const route = useRoute()
const router = useRouter()
const showJoinDialog = ref(false)
const joinLoading = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')
const { validate, resetForm } = useForm()

watch(showJoinDialog, (val) => {
    if (!val) {
        resetForm()
    }
})

const { value: name, errorMessage: nameError } = useField('name', (value) => {
    if (!value) return 'Name is required'
    if (!/^[a-zA-Z\s]*$/.test(value)) return 'Special characters are not allowed'
    return true
})
const { value: mobile, errorMessage: mobileError } = useField('mobile', (value) => {
    if (!value) return 'Mobile Number is required'
    if (!/^\d+$/.test(value)) return 'Mobile Number must contain only digits'
    if (value.length < 10) return 'Enter valid mobile number'
    return true
})
const { value: email, errorMessage: emailError } = useField('email', 'required|email')

const isNumber = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
    } else {
        return true;
    }
}

const isName = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    // Allow A-Z, a-z, space (32)
    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        evt.preventDefault();
    }
}

// Initialize values


// Microsite Data
const microsite = ref(null)


const loading = ref(true)
const isSiteActive = ref(false)
const fetchMicrosite = async () => {
    const { username, slug } = route.params
    if (!username || !slug) {
        router.push('/page-not-found-404')
        return
    }
    try {
        loading.value = true
        const response = await api.get(`/microsite/view/${username}/${slug}`)
        if (response.data.data && response.data.data.status === 'Approved' || store.isAuthenticated) {
            if (response.data.data.status === 'Approved') {
                isSiteActive.value = true;
            }
            microsite.value = response.data.data;
        } else {
            isSiteActive.value = false;
            router.push('/page-not-found-404')
        }
    } catch (error) {
        router.push('/page-not-found-404')
    } finally {
        loading.value = false
    }
}


const clickButton = () => {
    showJoinDialog.value = true;
    if (!store.isAuthenticated) {
        api.post(`/microsite/engagement/${route.params.slug}`)
    }

}

onMounted(() => {
    fetchMicrosite()
})



const handleJoin = async () => {
    if (store.isAuthenticated) {
        return;
    }
    const { valid } = await validate()
    if (valid && microsite.value) {
        joinLoading.value = true
        try {
            const payload = {
                name: name.value,
                email: email.value,
                mobile_number: mobile.value.toString(),
                microsite_id: microsite.value.id,
                user_id: microsite.value.user_id
            }
            const response = await api.post('/lead/create', payload)
            if (response.data && response.data.status) {
                showJoinDialog.value = false
                successMessage.value = response.data.message || 'Joined successfully!'
                showSuccess.value = true
                resetForm()
            }
        } catch (error) {
            console.error('Error joining microsite:', error)
            // Ideally handle error feedback here too
        } finally {
            joinLoading.value = false
        }
    }
}

// Dynamic Meta Tags
useHead({
    title: computed(() => microsite.value?.title || 'Fincommunity'),
    meta: [
        {
            name: 'title',
            content: computed(() => microsite.value?.title || 'Fincommunity')
        },
        {
            name: 'description',
            content: computed(() => microsite.value?.description || 'Check out my professional microsite')
        },

        {
            property: 'og:title',
            content: computed(() => microsite.value?.title || 'Fincommunity')
        },
        {
            property: 'og:description',
            content: computed(() => microsite.value?.description || 'Check out my professional microsite')
        },
        {
            property: 'og:image',
            content: computed(() => microsite.value?.banner_image ? getImage(microsite.value.banner_image, 'uploads/banner/') : '')
        },
        {
            property: 'og:type',
            content: 'profile'
        },
        {
            property: 'og:url',
            content: computed(() => window.location.href)
        },
        {
            property: 'og:site_name',
            content: 'Fincommunity'
        },
        {
            property: 'og:image:width',
            content: '1200'
        },
        {
            property: 'og:image:height',
            content: '630'
        },
        {
            property: 'og:image:alt',
            content: computed(() => microsite.value?.title || 'Microsite Banner')
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: computed(() => microsite.value?.title || 'Fincommunity')
        },
        {
            name: 'twitter:description',
            content: computed(() => microsite.value?.description || 'Check out my professional microsite')
        },
        {
            name: 'twitter:image',
            content: computed(() => microsite.value?.banner_image ? getImage(microsite.value.banner_image, 'uploads/banner/') : '')
        }
    ]
})
</script>
<style scoped>
.gap-3 {
    gap: 12px;
}

.gap-4 {
    gap: 16px;
}

.gap-2 {
    gap: 8px;
}

.social-icon {
    font-size: 30px;
    transition: border-radius 0.3s ease, transform 0.2s ease;
}

.social-icon:hover {
    border-radius: 50% !important;
    transform: translateY(-2px);
}

a {
    line-height: 1.2;
    color: inherit;
}

/* Profile Header Styles */
.profile-header-wrapper {
    position: relative;
    margin-top: -80px;
}

.profile-header-card {
    position: relative;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border: 1px solid rgba(103, 58, 183, 0.1);
    box-shadow: 0 8px 32px rgba(103, 58, 183, 0.12);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-header-card:hover {
    box-shadow: 0 12px 48px rgba(103, 58, 183, 0.18);
    transform: translateY(-2px);
}

.profile-gradient-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(135deg, #673ab7 0%, #9c27b0 50%, #e91e63 100%);
    opacity: 0.08;
    border-radius: 16px 16px 0 0;
}

.profile-content {
    position: relative;
    z-index: 1;
}

/* Avatar Styles */
.avatar-wrapper {
    animation: fadeInScale 0.6s ease-out;
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.8);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.profile-avatar {
    border: 4px solid white;
    box-shadow: 0 8px 24px rgba(103, 58, 183, 0.2);
    transition: all 0.3s ease;
}

.profile-avatar:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(103, 58, 183, 0.3);
}

.avatar-ring {
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 2px solid transparent;
    border-radius: 50%;
    background: linear-gradient(135deg, #673ab7, #9c27b0, #e91e63) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    animation: ringPulse 3s ease-in-out infinite;
}

@keyframes ringPulse {

    0%,
    100% {
        opacity: 0;
        transform: scale(1);
    }

    50% {
        opacity: 0.6;
        transform: scale(1.1);
    }
}

/* Name & Info Styles */
.profile-name {
    background: linear-gradient(135deg, #673ab7 0%, #9c27b0 50%, #e91e63 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeInUp 0.6s ease-out 0.2s both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.profile-info {
    animation: fadeInUp 0.6s ease-out 0.3s both;
}

/* Join Button Styles */
.join-btn {
    background: linear-gradient(135deg, #673ab7 0%, #9c27b0 100%) !important;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInUp 0.6s ease-out 0.4s both;
    position: relative;
    overflow: hidden;
}

.join-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
}

.join-btn:hover::before {
    left: 100%;
}

.join-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(103, 58, 183, 0.4) !important;
}

.join-btn:active {
    transform: translateY(0);
}

/* Responsive Adjustments */
@media (max-width: 600px) {
    .profile-header-wrapper {
        margin-top: -60px;
    }

    .profile-avatar {
        width: 100px !important;
        height: 100px !important;
    }

    .profile-name {
        font-size: 1.75rem !important;
    }

    .profile-gradient-bg {
        height: 80px;
    }

    .join-btn {
        width: 100%;
        max-width: 280px;
    }
}

@media (min-width: 601px) and (max-width: 960px) {
    .profile-header-wrapper {
        margin-top: -70px;
    }

    .profile-avatar {
        width: 120px !important;
        height: 120px !important;
    }
}

/* Smooth transitions for all interactive elements */
* {
    -webkit-tap-highlight-color: transparent;
}
</style>
