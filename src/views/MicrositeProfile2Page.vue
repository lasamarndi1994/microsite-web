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
                            <h2 class="text-h5 font-weight-regular mb-2" style="line-height: 1.4;">
                                A passionate digital creator helping brands grow through web development, design, and
                                strategic digital marketing.
                            </h2>
                            <p class="text-body-1 font-weight-light">
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
                            <h2 class="text-h5 font-weight-medium mb-2" style="line-height: 1.4;">
                                A passionate digital creator helping brands grow through web development, design, and
                                strategic digital marketing.
                            </h2>
                            <p class="text-body-1 font-weight-regular">
                                With 6+ years of experience, I build modern, conversion-focused digital experiences
                            </p>
                        </div>
                    </div>
                </v-img>
            </div>

            <v-container class="py-8" style="max-width: 1000px;">
                <!-- Profile Header -->
                <div class="d-flex flex-column flex-md-row align-center align-md-start mb-8 profile-header">
                    <v-avatar size="100" class="mb-4 mb-md-0 mx-0 mx-md-6 mr-md-6 ml-md-0">
                        <v-img src="https://randomuser.me/api/portraits/men/5.jpg" cover></v-img>
                    </v-avatar>
                    <div class="text-center text-md-start">
                        <h1 class="text-h5 font-weight-bold mb-1">Lasa Marndi</h1>
                        <div class="text-body-1 text-grey-darken-2">
                            ABCD Comapany <span class="mx-2">|</span> Bengaluru, India
                        </div>
                    </div>
                    <v-spacer class="d-none d-md-block"></v-spacer>
                    <v-btn color="deep-purple-accent-2" class="text-capitalize text-white px-6 mt-4 mt-md-0" height="44"
                        flat @click="showJoinDialog = true">
                        <template v-slot:prepend>
                            <v-icon size="28">mdi-handshake-outline</v-icon>
                        </template>
                        Join me
                    </v-btn>
                </div>

                <!-- About Section -->
                <div class="mb-8">
                    <h2 class="text-h6 font-weight-bold mb-4">About</h2>
                    <div class="border rounded-lg pa-6 text-body-1 text-grey-darken-3">
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
                    <div class="d-flex flex-wrap justify-space-between gap-4" style="max-width: 800px;">
                        <!-- LinkedIn -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-linkedin" color="#0A66C2" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://linkedn-<br>Mehta Creative Studio
                            </a>
                        </div>

                        <!-- X (Twitter) -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-alpha-x-circle" color="#000000" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://X-<br>Mehta Creative Studio
                            </a>
                        </div>

                        <!-- Instagram -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-instagram" color="#E4405F" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://Instgram-<br>Mehta Creative Studio
                            </a>
                        </div>

                        <!-- Telegram -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-send-circle" color="#0088cc" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://Telegram-<br>Mehta Creative Studio
                            </a>
                        </div>

                        <!-- Facebook -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-facebook" color="#1877F2" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://Facebook-<br>Mehta Creative Studio
                            </a>
                        </div>
                    </div>
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
                        <v-text-field v-model="joinForm.name" label="Name" variant="outlined" density="comfortable"
                            hide-details="auto" class="mb-5"></v-text-field>

                        <v-text-field v-model="joinForm.mobile" label="Mobile Number" variant="outlined"
                            density="comfortable" hide-details="auto" class="mb-5"></v-text-field>

                        <v-text-field v-model="joinForm.email" label="E-mail Address" placeholder="Ex : ajru@gmail.com"
                            variant="outlined" density="comfortable" hide-details="auto" class="mb-5"></v-text-field>
                    </div>

                    <v-btn block color="deep-purple-accent-2" size="large"
                        class="text-capitalize text-white rounded-lg mb-6" flat height="48"
                        @click="showJoinDialog = false">
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

const showJoinDialog = ref(false)
const joinForm = ref({
    name: 'Lasa Marndi',
    mobile: '9786453125',
    email: ''
})
</script>

<style scoped>
.gap-3 {
    gap: 12px;
}

.gap-4 {
    gap: 16px;
}

.social-icon {
    font-size: 30px;
}

a {
    line-height: 1.2;
    color: inherit;
}
</style>