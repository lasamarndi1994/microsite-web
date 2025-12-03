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
                <div class="d-flex flex-column flex-md-row align-start align-md-center mb-8">
                    <v-avatar size="100" class="mr-6 mb-4 mb-md-0">
                        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" cover></v-img>
                    </v-avatar>
                    <div>
                        <h1 class="text-h5 font-weight-bold mb-1">Arjun Mehta</h1>
                        <div class="text-body-1 text-grey-darken-2">
                            Mehta Creative Studio <span class="mx-2">|</span> Bengaluru, India
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple-accent-2" class="text-capitalize text-white px-6 mt-4 mt-md-0"
                        prepend-icon="mdi-handshake-outline" height="44" flat>
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
                            <v-btn icon="mdi-linkedin" color="blue-darken-2" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://linkedn-<br>Mehta Creative Studio
                            </a>
                        </div>

                        <!-- X (Twitter) -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-close" color="black" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://X-<br>Mehta Creative Studio
                            </a>
                        </div>

                        <!-- Instagram -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-instagram" color="pink-accent-3" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://Instgram-<br>Mehta Creative Studio
                            </a>
                        </div>

                        <!-- Telegram -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-send" color="light-blue" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://Telegram-<br>Mehta Creative Studio
                            </a>
                        </div>

                        <!-- Facebook -->
                        <div class="d-flex flex-column align-center text-center">
                            <v-btn icon="mdi-facebook" color="blue-darken-4" size="x-large" variant="text"
                                class="mb-2 social-icon"></v-btn>
                            <a href="#" class="text-caption text-decoration-underline text-grey-darken-3">
                                https://Facebook-<br>Mehta Creative Studio
                            </a>
                        </div>
                    </div>
                </div>

            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import AppBar from '@/components/AppBar.vue'
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
