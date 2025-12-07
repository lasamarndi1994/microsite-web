<template>
    <v-app>
        <AppBar />
        <v-main class="bg-white">
            <!-- Banner Section -->
            <div class="banner-container position-relative">
                <v-img src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" cover height="300"
                    class="align-center">
                    <div class="d-flex fill-height align-center justify-center">
                        <div class="text-center text-white px-4" style="max-width: 800px;">
                            <h2 class="font-weight-regular mb-2" style="line-height: 1.4;"
                                :class="$vuetify.display.smAndDown ? 'text-h6' : 'text-h5'">
                                A passionate digital creator helping brands grow through web development, design, and
                                strategic digital marketing.
                            </h2>
                            <p class="font-weight-light"
                                :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">
                                With 6+ years of experience, I build modern, conversion-focused digital experiences
                            </p>
                        </div>
                    </div>
                    <!-- Overlay for better text readability if needed -->
                    <div class="position-absolute top-0 left-0 w-100 h-100"
                        style="background: rgba(0, 0, 0, 0.4); z-index: 0;"></div>
                    <!-- Content needs higher z-index -->
                    <div class="position-absolute top-0 left-0 w-100 h-100 d-flex align-center justify-center"
                        style="z-index: 1;">
                        <div class="text-center text-white px-4" style="max-width: 800px;">
                            <h2 class="font-weight-medium mb-2" style="line-height: 1.4;"
                                :class="$vuetify.display.smAndDown ? 'text-h6' : 'text-h5'">
                                A passionate digital creator helping brands grow through web development, design, and
                                strategic digital marketing.
                            </h2>
                            <p class="font-weight-regular"
                                :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">
                                With 6+ years of experience, I build modern, conversion-focused digital experiences
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
                                        <v-img src="https://randomuser.me/api/portraits/men/5.jpg" cover></v-img>
                                    </v-avatar>
                                    <div class="avatar-ring"></div>
                                </div>
                            </div>

                            <!-- Name & Info Section -->
                            <div class="text-center mb-6">
                                <h1 class="profile-name font-weight-bold mb-3"
                                    :class="$vuetify.display.smAndDown ? 'text-h5' : 'text-h4'">Lasa Marndi</h1>
                                <div
                                    class="profile-info d-flex flex-column flex-sm-row align-center justify-center gap-2">
                                    <div class="d-flex align-center">
                                        <v-icon size="20" color="deep-purple-accent-2"
                                            class="mr-2">mdi-office-building</v-icon>
                                        <span class="text-grey-darken-2"
                                            :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">ABCD
                                            Company</span>
                                    </div>
                                    <span class="d-none d-sm-inline text-grey-lighten-1 mx-2">•</span>
                                    <div class="d-flex align-center">
                                        <v-icon size="20" color="deep-purple-accent-2"
                                            class="mr-2">mdi-map-marker</v-icon>
                                        <span class="text-grey-darken-2"
                                            :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">Bengaluru,
                                            India</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Action Button -->
                            <div class="text-center">
                                <v-btn color="deep-purple-accent-2"
                                    class="join-btn text-capitalize text-white px-8 elevation-4" height="50"
                                    rounded="pill" flat @click="showJoinDialog = true">
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
                    <div class="border rounded-lg pa-6 text-grey-darken-3"
                        :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">
                        A passionate digital creator helping brands grow through web development, design, and strategic
                        digital marketing. With 6+ years of experience, I build modern, conversion-focused digital
                        experiences.
                    </div>
                </div>

                <!-- Services Section -->
                <div class="mb-8">
                    <h2 class="text-h6 font-weight-bold mb-4">Services</h2>
                    <div class="d-flex flex-wrap gap-3">
                        <v-chip class="custom-chip bg-deep-purple-accent-2 text-white" label size="large">
                            Web development
                        </v-chip>
                        <v-chip class="custom-chip bg-deep-purple-accent-2 text-white" label size="large">
                            Digital marketing
                        </v-chip>
                        <v-chip class="custom-chip bg-deep-purple-accent-2 text-white" label size="large">
                            Graphic design
                        </v-chip>
                    </div>
                </div>

                <!-- Connect with me Section -->
                <div class="mb-8">
                    <h2 class="text-h6 font-weight-bold mb-6">Connect with me</h2>
                    <v-row>
                        <!-- LinkedIn -->
                        <v-col cols="4" sm="4" md="auto" class="d-flex justify-center">
                            <div class="d-flex flex-column align-center text-center">
                                <v-btn icon="mdi-linkedin" color="#0A66C2" size="x-large" variant="text"
                                    class="mb-2 social-icon"></v-btn>
                                <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                    https://linkedn-<br>Mehta Creative Studio
                                </a>
                            </div>
                        </v-col>

                        <!-- X (Twitter) -->
                        <v-col cols="4" sm="4" md="auto" class="d-flex justify-center">
                            <div class="d-flex flex-column align-center text-center">
                                <v-btn icon="mdi-alpha-x-circle" color="#000000" size="x-large" variant="text"
                                    class="mb-2 social-icon"></v-btn>
                                <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                    https://X-<br>Mehta Creative Studio
                                </a>
                            </div>
                        </v-col>

                        <!-- Instagram -->
                        <v-col cols="4" sm="4" md="auto" class="d-flex justify-center">
                            <div class="d-flex flex-column align-center text-center">
                                <v-btn icon="mdi-instagram" color="#E4405F" size="x-large" variant="text"
                                    class="mb-2 social-icon"></v-btn>
                                <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                    https://Instgram-<br>Mehta Creative Studio
                                </a>
                            </div>
                        </v-col>

                        <!-- Telegram -->
                        <v-col cols="4" sm="4" md="auto" class="d-flex justify-center">
                            <div class="d-flex flex-column align-center text-center">
                                <v-btn icon="mdi-send-circle" color="#0088cc" size="x-large" variant="text"
                                    class="mb-2 social-icon"></v-btn>
                                <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                    https://Telegram-<br>Mehta Creative Studio
                                </a>
                            </div>
                        </v-col>

                        <!-- Facebook -->
                        <v-col cols="4" sm="4" md="auto" class="d-flex justify-center">
                            <div class="d-flex flex-column align-center text-center">
                                <v-btn icon="mdi-facebook" color="#1877F2" size="x-large" variant="text"
                                    class="mb-2 social-icon"></v-btn>
                                <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                    https://Facebook-<br>Mehta Creative Studio
                                </a>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-container>


        </v-main>
        <!-- Join Me Dialog -->
        <v-dialog v-model="showJoinDialog" max-width="600" location="center">
            <v-card class="rounded-lg pa-0 overflow-hidden">
                <!-- Banner & Avatar Section -->
                <div class="position-relative mb-12">
                    <v-img src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" cover height="100"
                        class="align-start justify-end pa-2">
                        <v-btn icon="mdi-close" variant="text" color="white" density="compact"
                            @click="showJoinDialog = false"></v-btn>
                    </v-img>
                    <div class="position-absolute" style="bottom: -40px; left: 24px;">
                        <v-avatar size="80" class="border-2 border-white">
                            <v-img src="https://randomuser.me/api/portraits/men/5.jpg" cover></v-img>
                        </v-avatar>
                    </div>
                </div>

                <div class="px-6 pb-6">
                    <div class="mb-6">
                        <h3 class="text-h6 font-weight-bold">Join me</h3>
                    </div>

                    <div class="mb-4">
                        <v-text-field v-model="name" label="Name" variant="outlined" density="comfortable"
                            hide-details="auto" class="mb-5" :error-messages="nameError"></v-text-field>

                        <v-text-field v-model="mobile" label="Mobile Number" variant="outlined"
                            density="comfortable" hide-details="auto" class="mb-5" :error-messages="mobileError"></v-text-field>

                        <v-text-field v-model="email" label="E-mail Address" placeholder="Ex : ajru@gmail.com"
                            variant="outlined" density="comfortable" hide-details="auto" class="mb-5" :error-messages="emailError"></v-text-field>
                    </div>

                    <v-btn block color="deep-purple-accent-2" size="large"
                        class="text-capitalize text-white rounded-lg mb-6" flat height="48"
                        @click="handleJoin">
                        Join Now
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AppBar from '@/components/AppBar.vue'
import { useField, useForm } from 'vee-validate'

const showJoinDialog = ref(false)
const { validate } = useForm()

const { value: name, errorMessage: nameError } = useField('name', 'required')
const { value: mobile, errorMessage: mobileError } = useField('mobile', 'required|numeric|min:10')
const { value: email, errorMessage: emailError } = useField('email', 'required|email')

// Initialize values
name.value = 'Lasa Marndi'
mobile.value = '9786453125'

const handleJoin = async () => {
    const { valid } = await validate()

    if (valid) {
        console.log('Join form valid', { name: name.value, mobile: mobile.value, email: email.value })
        showJoinDialog.value = false
    }
}
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
