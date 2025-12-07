<template>
    <v-app>
        <AppBar />
        <v-main class="bg-grey-lighten-5">
            <v-container class="py-8">
                <v-card flat class="card-padding rounded-xl" min-height="80vh">
                    <div class="d-flex align-center justify-space-between mb-6">
                        <h1 class="font-weight-bold text-grey-darken-3" :class="$vuetify.display.smAndDown ? 'fs-20' : 'fs-24'">Create your microsite profile</h1>
                        <v-btn variant="text" color="grey-darken-2" icon @click="goBack">
                            <v-icon>mdi-arrow-left</v-icon>
                            <v-tooltip activator="parent" location="bottom">Back</v-tooltip>
                        </v-btn>
                    </div>

                    <!-- Media Section -->
                    <div class="mb-8">
                        <h2 class="fs-20 fw-500 mb-4 d-flex align-center" :class="$vuetify.display.smAndDown ? 'fs-18' : 'fs-20'">
                            <v-icon icon="mdi-image-outline" class="mr-2" color="grey-darken-1"></v-icon> Media
                        </h2>
                        <v-row>
                            <v-col cols="12" md="6" lg="8" class="d-flex align-center">
                                <div class="bg-grey-lighten-3 rounded-circle d-flex align-center justify-center mr-4"
                                    style="width: 100px; height: 100px;">
                                    <v-icon icon="mdi-account" color="grey" size="40"></v-icon>
                                </div>
                                <div>
                                    <div class="fw-500 mb-1" :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-16'">Profile Photo</div>
                                    <v-btn variant="outlined" size="small" class="text-capitalize px-4"
                                        style="border-color: var(--secondary-color); color: var(--secondary-color);"
                                        :ripple="false">
                                        Upload photo
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="12" md="6" lg="4">
                                <v-text-field v-model="title" label="Title" placeholder="Title" variant="outlined" density="default"
                                    class="bg-white" :error-messages="titleError"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>



                    <v-divider class="my-6"></v-divider>

                    <!-- Basic Details -->
                    <div class="mb-8">
                        <h2 class="fw-500 mb-4 d-flex align-center" :class="$vuetify.display.smAndDown ? 'fs-18' : 'fs-20'">
                            <v-icon icon="mdi-card-account-details-outline" class="mr-2" color="grey-darken-1"></v-icon>
                            Basic Details
                        </h2>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="fullName" label="Full Name" placeholder="First Name" variant="outlined"
                                    density="default" class="bg-white" :error-messages="fullNameError"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="businessName" label="Business name" placeholder="Business name" variant="outlined"
                                    density="default" class="bg-white" :error-messages="businessNameError"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="businessLocation" label="Business location" placeholder="Business location"
                                    variant="outlined" density="default" class="bg-white" :error-messages="businessLocationError"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="professionalNote" label="Professional note" placeholder="Professional note" variant="outlined"
                                    rows="3" class="bg-white"></v-textarea>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- Banner Photo -->
                    <div class="mb-8">
                        <h2 class="fs-20 fw-500 mb-4 d-flex align-center" :class="$vuetify.display.smAndDown ? 'fs-18' : 'fs-20'">
                            <v-icon icon="mdi-image-multiple-outline" class="mr-2" color="grey-darken-1"></v-icon>
                            Banner photo
                        </h2>
                        <div class="dashed-border pa-8 text-center bg-grey-lighten-5 d-flex flex-column align-center justify-center"
                            style="border-color: #E0E0E0; border-style: dashed; border-width: 2px; border-radius: 12px;">
                            <div class="bg-deep-purple-lighten-5 rounded-circle d-flex align-center justify-center mb-3"
                                style="width: 48px; height: 48px;">
                                <v-icon icon="mdi-cloud-upload-outline" size="24" color="deep-purple-accent-2"></v-icon>
                            </div>
                            <div class="text-grey-darken-3 mb-1 font-weight-medium" :class="$vuetify.display.smAndDown ? 'text-body-2' : 'text-body-1'">Browse and chose the
                                files you want to upload from your computer</div>
                            <div class="text-caption text-grey mb-4">Formats: JPG, PNG • Max size: 10 MB • Dimensions:
                                800x800 px</div>
                            <v-btn variant="outlined" class="text-capitalize px-6"
                                style="border-color: var(--secondary-color); color: var(--secondary-color);"
                                :ripple="false">
                                Upload Banner
                            </v-btn>
                        </div>
                    </div>

                    <!-- Social Links -->
                    <div class="mb-8">
                        <h2 class="fw-500 mb-4 d-flex align-center" :class="$vuetify.display.smAndDown ? 'fs-18' : 'fs-20'">
                            <v-icon icon="mdi-share-variant-outline" class="mr-2" color="grey-darken-1"></v-icon> Social
                            Links
                        </h2>
                        <div class="d-flex align-center">
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <div v-bind="props"
                                        class="d-flex align-center bg-grey-lighten-4 rounded-lg mr-2 px-3 social-icon-div"
                                        style="height: 56px; border: 1px solid #E0E0E0; cursor: pointer;">
                                        <v-icon :icon="selectedSocial.icon" class="mr-2"
                                            :color="selectedSocial.color" size="42"></v-icon>
                                        <v-icon icon="mdi-chevron-down" color="grey-darken-2"></v-icon>
                                    </div>
                                </template>
                                <v-list>
                                    <v-list-item v-for="social in socialPlatforms" :key="social.name"
                                        @click="selectedSocial = social">
                                        <template v-slot:prepend>
                                            <v-icon :icon="social.icon" :color="social.color" size="32"></v-icon>
                                        </template>
                                        <v-list-item-title>{{ social.name }}</v-list-item-title>

                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <v-text-field v-model="socialUrl" :placeholder="selectedSocial.placeholder" variant="outlined" hide-details="auto"
                                class="bg-white mr-4 social-text-field" density="default" :error-messages="socialUrlError"></v-text-field>
                            <v-btn variant="text" class="text-capitalize px-3" prepend-icon="mdi-plus-circle-outline"
                                style="color: var(--secondary-color); font-size: 16px; font-weight: 500;"
                                :ripple="false">
                                Add
                            </v-btn>
                        </div>
                    </div>

                    <v-divider></v-divider>

                    <!-- Services -->
                    <div class="mb-8 mt-5">
                        <h2 class="fw-500 mb-4 d-flex align-center" :class="$vuetify.display.smAndDown ? 'fs-18' : 'fs-20'">
                            <v-icon icon="mdi-briefcase-outline" class="mr-2" color="grey-darken-1"></v-icon> Services
                        </h2>
                        <div class="d-flex flex-wrap gap-3">
                            <v-chip class="custom-chip"
                                :class="selectedServices.includes('Web development') ? 'bg-deep-purple-accent-2 text-white' : ''"
                                :variant="selectedServices.includes('Web development') ? 'flat' : 'outlined'" label
                                size="large" @click="toggleService('Web development')">
                                Web development
                            </v-chip>
                            <v-chip class="custom-chip"
                                :class="selectedServices.includes('Digital marketing') ? 'bg-deep-purple-accent-2 text-white' : ''"
                                :variant="selectedServices.includes('Digital marketing') ? 'flat' : 'outlined'" label
                                size="large" @click="toggleService('Digital marketing')">
                                Digital marketing
                            </v-chip>
                            <v-chip class="custom-chip"
                                :class="selectedServices.includes('Graphic design') ? 'bg-deep-purple-accent-2 text-white' : ''"
                                :variant="selectedServices.includes('Graphic design') ? 'flat' : 'outlined'" label
                                size="large" @click="toggleService('Graphic design')">
                                Graphic design
                            </v-chip>
                        </div>
                    </div>

                    <!-- Footer Actions -->
                    <v-row class="mt-8" justify="center">
                        <v-col cols="12" sm="auto" class="d-flex justify-center">
                            <v-btn variant="outlined" class="text-capitalize" height="44"
                                style="border-color: var(--secondary-color); color: var(--secondary-color);"
                                prepend-icon="mdi-file-document-outline">
                                Save in Draft
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="auto" class="d-flex justify-center">
                            <v-btn class="btn-secondary text-white text-capitalize"
                                prepend-icon="mdi-content-save-outline" height="44" flat
                                @click="handleSave">
                                Save and Continue
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppBar from '@/components/AppBar.vue'

import { useField, useForm } from 'vee-validate'

const router = useRouter()
const { validate } = useForm()

const { value: title, errorMessage: titleError } = useField('title', 'required')
const { value: fullName, errorMessage: fullNameError } = useField('fullName', 'required')
const { value: businessName, errorMessage: businessNameError } = useField('businessName', 'required')
const { value: businessLocation, errorMessage: businessLocationError } = useField('businessLocation', 'required')
const { value: professionalNote } = useField('professionalNote')
const { value: socialUrl, errorMessage: socialUrlError } = useField('socialUrl', 'url')

// Social media platforms data
const socialPlatforms = ref([
    {
        name: 'Website',
        icon: 'mdi-web',
        color: 'grey-darken-2',
        placeholder: 'https://www.yourwebsite.com'
    },
    {
        name: 'Facebook',
        icon: 'mdi-facebook',
        color: '#1877F2',
        placeholder: 'https://www.facebook.com/username'
    },
    {
        name: 'Instagram',
        icon: 'mdi-instagram',
        color: '#E4405F',
        placeholder: 'https://www.instagram.com/username'
    },
    {
        name: 'Twitter/X',
        icon: 'mdi-twitter',
        color: '#1DA1F2',
        placeholder: 'https://twitter.com/username'
    },
    {
        name: 'LinkedIn',
        icon: 'mdi-linkedin',
        color: '#0A66C2',
        placeholder: 'https://www.linkedin.com/in/username'
    },
    {
        name: 'YouTube',
        icon: 'mdi-youtube',
        color: '#FF0000',
        placeholder: 'https://www.youtube.com/@username'
    },
    {
        name: 'TikTok',
        icon: 'mdi-music-note',
        color: '#000000',
        placeholder: 'https://www.tiktok.com/@username'
    },
    {
        name: 'WhatsApp',
        icon: 'mdi-whatsapp',
        color: '#25D366',
        placeholder: 'https://wa.me/1234567890'
    },
    {
        name: 'GitHub',
        icon: 'mdi-github',
        color: '#181717',
        placeholder: 'https://github.com/username'
    }
])

const selectedSocial = ref({ ...socialPlatforms.value[0] })
const selectedServices = ref(['Web development'])

const toggleService = (service) => {
    const index = selectedServices.value.indexOf(service)
    if (index > -1) {
        selectedServices.value.splice(index, 1)
    } else {
        selectedServices.value.push(service)
    }
}

const goBack = () => {
    router.back()
}

const handleSave = async () => {
    const { valid } = await validate()

    if (valid) {
        // Proceed with save
        const formData = {
            title: title.value,
            fullName: fullName.value,
            businessName: businessName.value,
            businessLocation: businessLocation.value,
            professionalNote: professionalNote.value,
            socialUrl: socialUrl.value
        }
        console.log('Form is valid', formData)
        router.push('/microsite-profile')
    } else {
        // Scroll to top to show errors
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}
</script>

<style scoped>
.gap-4 {
    gap: 26px;
}

.gap-3 {
    gap: 12px;
}


.service-btn {
    min-width: 176px;
    height: 52px !important;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
}

.footer-btn {
    width: 300px;
    height: 52px;
    padding: 14px 24px;
    border-color: var(--secondary-color) !important;
}

.footer-btn .v-icon {
    font-size: 20px !important;
}



.social-text-field {
    max-width: 500px;
}
</style>
