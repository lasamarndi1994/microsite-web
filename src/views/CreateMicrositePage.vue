<template>
    <app-layout>
        <v-card flat :class="$vuetify.display.smAndDown ? 'bg-transparent' : 'card-padding rounded-xl'"
            :min-height="$vuetify.display.smAndDown ? '100%' : '80vh'">
            <v-container class="pa-0" style="max-width: 1000px;">
                <div class="d-flex align-center justify-space-between mb-6">
                    <div>
                        <h1 class="font-weight-bold text-grey-darken-3"
                            :class="$vuetify.display.smAndDown ? 'fs-20' : 'fs-24'">
                            {{ isPreview ? 'Update' : 'Create' }} your microsite profile</h1>
                        <p class="text-grey-darken-1 text-body-2 mt-1">Setup your professional microsite</p>
                    </div>
                    <!-- Top Actions -->
                    <div class="d-flex align-center gap-3">
                        <v-btn variant="outlined" color="grey-darken-2" size="small" class="text-capitalize"
                            v-if="isPreview" @click="handlePreview" prepend-icon="mdi-eye-outline">
                            Preview
                        </v-btn>

                        <v-btn variant="text" color="grey-darken-2" icon @click="goBack">
                            <v-icon>mdi-close</v-icon>
                            <v-tooltip activator="parent" location="bottom">Close</v-tooltip>
                        </v-btn>
                    </div>
                </div>

                <!-- Main Form Card -->
                <v-card flat class="rounded-xl overflow-hidden pb-8" style="background-color: #F8F9FB;">
                    <!-- Hero Section (Banner & Profile) -->
                    <div class="position-relative bg-white mb-6">
                        <!-- Banner Area -->
                        <div class="banner-upload-area position-relative"
                            :style="{ height: '240px', backgroundColor: bannerPhoto ? '#000' : '#F3F4F6' }">

                            <v-img v-if="bannerPhoto" :src="bannerPhoto" cover height="100%"
                                class="w-100 opacity-90"></v-img>

                            <!-- Banner Actions -->
                            <div class="position-absolute w-100 h-100 d-flex flex-column align-center justify-center banner-hover-overlay"
                                style="top: 0; left: 0; transition: all 0.3s;">
                                <v-btn variant="flat" color="white" class="text-capitalize" prepend-icon="mdi-camera"
                                    @click="triggerBannerUpload">
                                    {{ bannerPhoto ? 'Change Banner' : 'Add Banner Image' }}
                                </v-btn>
                                <div class="text-caption text-grey mt-1 text-center font-weight-medium"
                                    v-if="!bannerPhoto">
                                    Recommended: 1200x400px <span class="mx-1">•</span> Min: 400x400px
                                    Max size: 5MB <span class="mx-1">•</span> JPG, PNG
                                </div>
                                <input type="file" ref="bannerInputRef" accept="image/*" class="d-none"
                                    @change="onBannerChange" />
                                <div v-if="bannerError" class="text-caption text-red mt-2 bg-white px-2 rounded">{{
                                    bannerError }}</div>
                            </div>

                            <!-- Close Banner -->
                            <v-btn v-if="bannerPhoto" icon="mdi-close" size="small" color="primary" variant="flat"
                                class="position-absolute remove-banner-btn" style="top: 16px; right: 16px; z-index: 2;"
                                @click="removeBannerPhoto"></v-btn>
                        </div>

                        <!-- Profile Photo Overlay -->
                        <div class="d-flex justify-center position-relative"
                            style="margin-top: -60px; pointer-events: none;">
                            <div class="position-relative profile-upload-wrapper" style="pointer-events: auto;">
                                <!-- Profile Image -->
                                <div class="rounded-circle border-white elevation-2 bg-white d-flex align-center justify-center overflow-hidden"
                                    style="width: 120px; height: 120px; border-width: 4px; border-style: solid;">
                                    <v-img v-if="profilePhoto" :src="profilePhoto" cover width="100%"
                                        height="100%"></v-img>
                                    <v-icon v-else icon="mdi-account" size="48" color="grey-lighten-2"></v-icon>
                                </div>

                                <!-- Upload Button (Small) -->
                                <v-btn icon="mdi-camera" size="small" color="secondary" variant="flat"
                                    class="position-absolute elevation-3"
                                    style="bottom: 4px; right: 4px; border: 2px solid white;"
                                    @click="triggerProfileUpload">
                                </v-btn>
                                <input type="file" ref="profileInputRef" accept="image/*" class="d-none"
                                    @change="onProfileChange" />

                                <!-- Remove Button -->
                                <v-btn v-if="profilePhoto" icon="mdi-close" size="x-small" color="error" variant="flat"
                                    class="position-absolute remove-profile-btn" style="top: 0; right: 0;"
                                    @click="removeProfilePhoto"></v-btn>
                            </div>
                        </div>
                        <div v-if="profileError" class="text-center text-caption text-red mt-2">{{ profileError }}</div>
                    </div>

                    <!-- Content Container -->
                    <v-container class="px-4 px-md-8">

                        <!-- Basic Setup Card -->
                        <v-card flat class="rounded-lg pa-6 mb-6 border" style="border-color: #EEE !important;">
                            <div class="d-flex align-center mb-6">
                                <v-avatar color="blue-lighten-5" size="40" class="mr-3">
                                    <v-icon icon="mdi-text-box-edit-outline" color="blue" size="24"></v-icon>
                                </v-avatar>
                                <div>
                                    <h3 class="text-body-1 font-weight-bold text-grey-darken-3">Basic Information</h3>
                                    <p class="text-caption text-grey">Main details about your profile</p>
                                </div>
                            </div>

                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="title" label="Microsite Title"
                                        placeholder="e.g. My Professional Portfolio" variant="outlined"
                                        density="default" class="bg-white" hide-details="auto"
                                        :error-messages="titleError"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="subTitle" label="Subtitle (Optional)"
                                        placeholder="e.g. Design & Development" variant="outlined" density="default"
                                        class="bg-white" hide-details="auto"
                                        :error-messages="subTitleError"></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-divider class="my-2"></v-divider>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="fullName" label="Full Name" placeholder="Your Name"
                                        variant="outlined" density="default" class="bg-white" hide-details="auto"
                                        :error-messages="fullNameError"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="businessName" label="Business Name"
                                        placeholder="Company / Brand" variant="outlined" density="default"
                                        class="bg-white" hide-details="auto"
                                        :error-messages="businessNameError"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="businessLocation" label="Location"
                                        placeholder="City, Country" variant="outlined" density="default"
                                        class="bg-white" hide-details="auto"
                                        :error-messages="businessLocationError"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="professionalNote" label="About You / Professional Note"
                                        variant="outlined" rows="3" class="bg-white" hide-details="auto"
                                        :error-messages="professionalNoteError"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card>

                        <!-- Services Setup Card -->
                        <v-card flat class="rounded-lg pa-6 mb-6 border" style="border-color: #EEE !important;">
                            <div class="d-flex align-center mb-6">
                                <v-avatar color="purple-lighten-5" size="40" class="mr-3">
                                    <v-icon icon="mdi-briefcase-check-outline" color="purple" size="24"></v-icon>
                                </v-avatar>
                                <div>
                                    <h3 class="text-body-1 font-weight-bold text-grey-darken-3">Services</h3>
                                    <p class="text-caption text-grey">What you offer (Select or add custom)</p>
                                </div>
                            </div>

                            <div class="d-flex flex-wrap gap-3">
                                <v-chip v-for="service in availableServices" :key="service" class="custom-chip pr-2"
                                    :class="selectedServices.includes(service) ? 'bg-deep-purple-accent-2 text-white' : ''"
                                    :variant="selectedServices.includes(service) ? 'flat' : 'outlined'" label
                                    size="large" @click="toggleService(service)">
                                    {{ service }}
                                    <v-icon icon="mdi-close-circle" size="small" class="ml-2 remove-service-icon"
                                        @click.stop="removeService(service)"></v-icon>
                                </v-chip>

                                <!-- Custom Service Input -->
                                <div class="custom-chip d-flex align-center px-0 service-input">
                                    <input v-model="newService" type="text" placeholder="+ Add Custom"
                                        class="w-100 h-100 px-4 text-body-2" style="outline: none;"
                                        @keydown.enter.prevent="addCustomService" @blur="addCustomService" />
                                </div>
                            </div>
                            <div v-if="servicesError" class="text-caption text-red mt-2 d-flex align-center">

                                {{ servicesError }}
                            </div>
                        </v-card>

                        <!-- Social Links Card -->
                        <v-card flat class="rounded-lg pa-6 border" style="border-color: #EEE !important;">
                            <div class="d-flex align-center mb-6">
                                <v-avatar color="teal-lighten-5" size="40" class="mr-3">
                                    <v-icon icon="mdi-share-variant-outline" color="teal" size="24"></v-icon>
                                </v-avatar>
                                <div>
                                    <h3 class="text-body-1 font-weight-bold text-grey-darken-3">Social Connections</h3>
                                    <p class="text-caption text-grey">Where people can find you</p>
                                </div>
                            </div>

                            <v-row class="mt-0">
                                <v-col cols="12" md="6" v-for="(item, index) in socialLinks" :key="index" class="py-2">
                                    <div class="d-flex align-center">
                                        <v-menu width="200" max-height="300">
                                            <template v-slot:activator="{ props }">
                                                <div v-bind="props"
                                                    class="d-flex align-center justify-center bg-grey-lighten-4 rounded-s-lg px-2 flex-shrink-0"
                                                    style="height: 58px; width: 56px; border: 1px solid #E0E0E0; border-right: none; cursor: pointer;">

                                                    <v-icon :icon="item.platform.icon" :color="item.platform.color"
                                                        size="40"></v-icon>
                                                </div>
                                            </template>
                                            <v-list density="compact" class="py-0">
                                                <v-list-item v-for="social in socialPlatforms" :key="social.name"
                                                    @click="item.platform = social" color="primary">
                                                    <template v-slot:prepend>
                                                        <v-icon :icon="social.icon" :color="social.color" size="40"
                                                            class="mr-2"></v-icon>
                                                    </template>
                                                    <v-list-item-title class="text-caption">{{ social.name
                                                        }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>

                                        <v-text-field v-model="item.url" :placeholder="item.platform.placeholder"
                                            variant="outlined" hide-details="auto"
                                            class="bg-white rounded-0 rounded-e-lg" density="default"
                                            style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                            <template v-slot:append-inner>
                                                <v-btn icon="mdi-minus-circle-outline" variant="text" color="red"
                                                    size="small" density="compact" @click="removeSocialLink(index)"
                                                    v-if="socialLinks.length > 1">
                                                </v-btn>
                                            </template>
                                        </v-text-field>
                                    </div>
                                </v-col>
                            </v-row>

                            <div class="d-flex align-center mt-4">
                                <v-btn variant="tonal" class="text-capitalize px-4" prepend-icon="mdi-plus" size="small"
                                    color="primary" :ripple="false" @click="addSocialLink">
                                    Add Another Link
                                </v-btn>
                            </div>
                            <div v-if="socialError" class="text-caption text-red mt-2">{{ socialError }}</div>
                        </v-card>

                    </v-container>

                    <!-- Footer Actions -->
                    <v-row class="mt-8" justify="center">
                        <v-col cols="12" sm="auto" class="d-flex justify-center">
                            <v-btn variant="outlined" class="text-capitalize" height="48"
                                style="border-color: var(--secondary-color); color: var(--secondary-color);"
                                prepend-icon="mdi-file-document-outline" @click="handleSaveAndUpdate('Draft')">
                                Save in Draft
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="auto" class="d-flex justify-center">
                            <v-btn class="btn-primary text-white text-capitalize"
                                prepend-icon="mdi-content-save-outline" height="48" flat
                                @click="handleSaveAndUpdate('Pending')" elevation="2" :loading="loading">
                                {{ isPreview ? 'Update and Continue' : 'Save and Continue' }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-card>
    </app-layout>
    <v-snackbar v-model="showSuccess" color="success" timeout="3000" location="bottom center">
        {{ successMessage }}
    </v-snackbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api'
import { getImage } from '@/utils/helpers'

import { useField, useForm } from 'vee-validate'

const router = useRouter()
const route = useRoute()
const { validate } = useForm()

const { value: title, errorMessage: titleError } = useField('title', 'required')
const { value: subTitle, errorMessage: subTitleError } = useField('subTitle') // Optional
const { value: fullName, errorMessage: fullNameError, resetField: resetFullName } = useField('fullName', 'required')
const { value: businessName, errorMessage: businessNameError, resetField: resetBusinessName } = useField('businessName', 'required')
const { value: businessLocation, errorMessage: businessLocationError, resetField: resetBusinessLocation } = useField('businessLocation', 'required')
const { value: professionalNote, errorMessage: professionalNoteError } = useField('professionalNote', 'required')

// Error messages for manual validation
const profileError = ref('')
const servicesError = ref('')
const socialError = ref('')
const showSuccess = ref(false)
const successMessage = ref('')
const loading = ref(false)
const micrositeSlug = ref('')
const userSlug = ref('')
const isPreview = ref(false);



// Image Upload Logic
const profileInputRef = ref(null)
const bannerInputRef = ref(null)
const profilePhoto = ref(null)
const bannerPhoto = ref(null)
const profileFile = ref(null)
const bannerFile = ref(null)
const profileBase64 = ref("")
const bannerBase64 = ref("")
const bannerError = ref("")
const selectedServices = ref([])
const availableServices = ref(['Market Education', 'Account Opening Support', 'Community Group Access', 'Platform Training', 'Trading Tools & Resources'])
const newService = ref('')

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const triggerProfileUpload = () => {
    profileInputRef.value.click()
    profileError.value = ''
}

const triggerBannerUpload = () => {
    bannerInputRef.value.click()
    bannerError.value = '' // Clear banner error on trigger
}

const onProfileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
        profileFile.value = file
        profilePhoto.value = URL.createObjectURL(file)
        try {
            profileBase64.value = await convertToBase64(file);
        } catch (error) {
            console.error("Error converting profile to base64:", error);
        }
    }
}

const onBannerChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        const img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = async () => {
            if (img.width < 400 || img.height < 400) {
                bannerError.value = 'Banner dimensions must be at least 400x400 pixels.'
                bannerFile.value = null
                bannerPhoto.value = null
                bannerBase64.value = ''
                if (bannerInputRef.value) bannerInputRef.value.value = ''
            } else {
                bannerError.value = ''
                bannerFile.value = file
                bannerPhoto.value = img.src
                try {
                    bannerBase64.value = await convertToBase64(file);
                } catch (error) {
                    console.error("Error converting banner to base64:", error);
                }
            }
        }
    }
}

const removeProfilePhoto = () => {
    profilePhoto.value = null
    profileFile.value = null
    profileBase64.value = ''
    if (profileInputRef.value) profileInputRef.value.value = ''
}

const removeBannerPhoto = () => {
    bannerPhoto.value = null
    bannerFile.value = null
    bannerBase64.value = ''
    bannerError.value = ''
    if (bannerInputRef.value) bannerInputRef.value.value = ''
}

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

const socialLinks = ref([
    { platform: socialPlatforms.value[0], url: '' }
])

const addSocialLink = () => {
    socialLinks.value.push({
        platform: socialPlatforms.value[0],
        url: ''
    })
}

const removeSocialLink = (index) => {
    if (socialLinks.value.length > 1) {
        socialLinks.value.splice(index, 1)
    } else {
        socialLinks.value[0].url = ''
        socialLinks.value[0].platform = socialPlatforms.value[0]
    }
}



const toggleService = (service) => {
    const index = selectedServices.value.indexOf(service)
    if (index > -1) {
        selectedServices.value.splice(index, 1);
    } else {
        selectedServices.value.push(service);
    }
    // Clear error if service is selected
    if (selectedServices.value.length > 0) {
        servicesError.value = ''
    }
}

const addCustomService = () => {
    const service = newService.value.trim()
    if (service) {
        if (!availableServices.value.includes(service)) {
            availableServices.value.push(service);
        }
        if (!selectedServices.value.includes(service)) {
            selectedServices.value.push(service);
        }
        newService.value = '';
    }
}

const removeService = (service) => {
    const availableIndex = availableServices.value.indexOf(service)
    if (availableIndex > -1) {
        availableServices.value.splice(availableIndex, 1);
    }

    const selectedIndex = selectedServices.value.indexOf(service)
    if (selectedIndex > -1) {
        selectedServices.value.splice(selectedIndex, 1);
    }
}

const goBack = () => {
    router.back()
}

const handlePreview = () => {
    if (route.params.uuid && micrositeSlug.value && userSlug.value) {
        router.push(`/${userSlug.value}/${micrositeSlug.value}`);
    }
}

const handleSaveAndUpdate = async (status = 'Pending') => {
    // Reset manual errors
    profileError.value = ''
    bannerError.value = '' // Assuming bannerError is already defined for dimensions, we reuse or add logic

    servicesError.value = ''
    socialError.value = ''

    const { valid } = await validate()

    let manualValid = true

    if (!profilePhoto.value) {
        profileError.value = 'Profile photo is required'
        manualValid = false
    }

    if (!bannerPhoto.value) {
        bannerError.value = 'Banner photo is required'
        manualValid = false
    }

    if (selectedServices.value.length === 0) {
        servicesError.value = 'At least one service is required'
        manualValid = false
    }

    const validSocialLinks = socialLinks.value.filter(link => link.url && link.url.trim() !== '')
    if (validSocialLinks.length === 0) {
        socialError.value = 'At least one social link is required'
        manualValid = false
    }

    if (valid && manualValid) {
        // Proceed with save
        loading.value = true
        try {
            const formData = {
                title: title.value,
                sub_title: subTitle.value,
                full_name: fullName.value,
                description: professionalNote.value,
                business_name: businessName.value,
                location: businessLocation.value,
                request_type: status,
                services_name: selectedServices.value.map(service => ({ name: service })),
                social_link: socialLinks.value
                    .filter(link => link.url && link.url.trim() !== '')
                    .map(link => ({
                        name: link.platform.name,
                        url: link.url
                    }))
            };

            if (bannerBase64.value) {
                formData.banner_image = bannerBase64.value;
            }
            if (profileBase64.value) {
                formData.avatar_icon = profileBase64.value;
            }

            if (route.params.uuid) {
                formData.microsite_uuid = route.params.uuid;
                await api.put('/microsite/update/' + route.params.uuid, formData);
                successMessage.value = 'Microsite updated successfully';
            } else {
                // Ensure images are present for create if not handled by validation (validation checks photo ref, not base64)
                // But if photo ref is present and it's create, base64 should be there.
                if (!formData.banner_image) formData.banner_image = bannerBase64.value;
                if (!formData.avatar_icon) formData.avatar_icon = profileBase64.value;

                await api.post('/microsite/create', formData);
                successMessage.value = 'Microsite created successfully';
            }

            // On success
            showSuccess.value = true;
            setTimeout(() => {
                if (status === 'Draft') {
                    router.push('/drafts-microsite');
                } else {
                    router.push('/dashboard?tab=pending');
                }
            }, 600);
        } catch (error) {
            console.error('Error creating/updating microsite:', error);
            // Handle error (e.g., show notification)
        } finally {
            loading.value = false
        }
    } else {
        // Scroll to top to show errors
        window.scrollTo({
            top: 50,
            behavior: 'smooth'
        })
    }
}

const fetchMicrositeDetails = async (uuid) => {
    try {
        const response = await api.get(`/microsite/details/${uuid}`);
        const data = response.data.data;

        title.value = data.title;
        subTitle.value = data.sub_title;
        fullName.value = data.full_name;
        businessName.value = data.business_name;
        businessLocation.value = data.location;
        professionalNote.value = data.description;
        micrositeSlug.value = data.slug;
        if (data.user) {
            userSlug.value = data.user.slug;
        }

        if (data.banner_image) {
            bannerPhoto.value = getImage(data.banner_image, 'uploads/banner/');
        }
        if (data.avatar_icon) {
            profilePhoto.value = getImage(data.avatar_icon, 'uploads/avatar/');
        }

        if (data.services) {
            selectedServices.value = data.services.map(s => s.name);
            data.services.forEach(s => {
                if (!availableServices.value.includes(s.name)) {
                    availableServices.value.push(s.name);
                }
            });
        }

        if (data.social_links && data.social_links.length > 0) {
            socialLinks.value = data.social_links.map(link => {
                let platform = socialPlatforms.value.find(p => {
                    const pName = p.name.toLowerCase();
                    const lName = (link.name).toLowerCase();
                    return pName === lName ||
                        (pName.includes('twitter') && lName.includes('twitter')) ||
                        (pName.includes('twitter') && lName === 'x');
                });
                return {
                    platform: platform || socialPlatforms.value[0],
                    url: link.url
                };
            });
        }
    } catch (error) {
        console.error('Error fetching microsite details:', error);
    }
};



const fetchAuthUser = async () => {
    try {
        const response = await api.get('/auth/user');
        const user = response.data.data; // Adjust based on API response structure
        if (user) {
            resetFullName({ value: user.user_name || '' });
            resetBusinessName({ value: user.business_name || '' });
            resetBusinessLocation({ value: user.business_location || '' });
            if (user.user_avatar) {
                profilePhoto.value = getImage(user.user_avatar, 'uploads/avatar/');
                try {
                    const imgUrl = getImage(user.user_avatar, 'uploads/avatar/');
                    const res = await fetch(imgUrl);
                    const blob = await res.blob();
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        profileBase64.value = reader.result;
                    };
                    reader.readAsDataURL(blob);
                } catch (e) {
                    console.error('Failed to convert prefilled avatar to base64', e);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

onMounted(async () => {
    if (route.params.uuid) {
        isPreview.value = true;
        await fetchMicrositeDetails(route.params.uuid);
    }
    else {
        // Prefill user data for new microsite
        await fetchAuthUser()

    }

})
</script>

<style scoped>
.gap-2 {
    gap: 8px;
}

.gap-3 {
    gap: 12px;
}

.min-vh-100 {
    min-height: 100vh;
}

.fs-20 {
    font-size: 20px;
}

.fs-24 {
    font-size: 24px;
}

/* Banner Styles */
.banner-overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4));
}

.banner-hover-action {
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.banner-container:hover .banner-hover-action {
    opacity: 1;
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
    transform: scale(1.02);
    box-shadow: 0 12px 32px rgba(103, 58, 183, 0.3);
}

/* Service Chips */
.custom-chip .remove-service-icon {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}

.custom-chip:hover .remove-service-icon {
    opacity: 1;
}

.service-input {
    border: 1px solid #BDBDBD;
    overflow: hidden;
    max-width: 180px;
    border-radius: 4px;
    /* Match chip rounded style */
    height: 38px;
}

/* Responsive Adjustments */
@media (max-width: 600px) {
    .profile-header-wrapper {
        margin-top: -60px;
    }

    .profile-avatar {
        width: 120px !important;
        height: 120px !important;
    }
}

.bg-black-opacity {
    background-color: rgba(0, 0, 0, 0.4);
}

/* Remove Button Hover Effects */
.remove-banner-btn,
.remove-profile-btn {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.banner-upload-area:hover .remove-banner-btn,
.profile-upload-wrapper:hover .remove-profile-btn {
    opacity: 1;
}
</style>
