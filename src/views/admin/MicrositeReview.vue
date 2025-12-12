<template>
  <app-layout>
    <!-- Main White Card -->
    <v-card flat class="rounded-xl pa-8 card-padding" elevation="0">
      <!-- Header Section Inside Card -->
      <div class="mb-8">
        <div class="d-flex align-center justify-space-between mb-1">
          <div>
            <h1 class="font-weight-bold text-grey-darken-3 mb-1"
              :class="$vuetify.display.smAndDown ? 'fs-20' : 'fs-24'">Review Microsite Submission</h1>
            <p class="text-grey-darken-1" :class="$vuetify.display.smAndDown ? 'text-subtitle-2' : 'text-subtitle-1'">
              Review and approve or reject microsite details
            </p>
          </div>
          <v-btn variant="text" color="grey-darken-2" icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
            <v-tooltip activator="parent" location="bottom">Back</v-tooltip>
          </v-btn>
        </div>
      </div>

      <!-- Media Section -->
      <div class="mb-8">
        <h2 class="fs-18 font-weight-medium mb-6 d-flex align-center text-grey-darken-3">
          <v-icon icon="mdi-image-outline" size="20" class="mr-2"></v-icon>
          Media
        </h2>

        <v-row align="center">
          <v-col cols="12" md="4">
            <div class="d-flex align-start">
              <v-avatar size="120" class="mr-4">
                <v-img :src="getImage(microsite?.avatar_icon, 'uploads/avatar/')"
                  lazy-src="getImage(microsite?.avatar_icon, 'uploads/avatar/')" cover></v-img>
              </v-avatar>

            </div>
          </v-col>
          <v-col cols="12" md="8" class="d-flex align-center justify-end">
            <div class="product-launch-pill responsive-pill">
              {{ microsite?.title }}
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Basic Details Section -->
      <div class="mb-8">
        <h2 class="fs-18 font-weight-medium mb-6 d-flex align-center text-grey-darken-3">
          <v-icon icon="mdi-card-account-details-outline" size="20" class="mr-2"></v-icon>
          Basic Details
        </h2>

        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <div class="text-box-style">
              <div class="text-caption text-grey-darken-1 mb-1">Full Name</div>
              <div class="text-body-1 text-grey-darken-3">{{ microsite?.full_name }}</div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-box-style">
              <div class="text-caption text-grey-darken-1 mb-1">Business name</div>
              <div class="text-body-1 text-grey-darken-3">{{ microsite?.business_name }}</div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-box-style">
              <div class="text-caption text-grey-darken-1 mb-1">Business location</div>
              <div class="text-body-1 text-grey-darken-3">{{ microsite?.location }}</div>
            </div>
          </v-col>
        </v-row>

        <div class="text-box-style">
          <div class="text-caption text-grey-darken-1 mb-1">Professional bio</div>
          <div class="text-body-2 text-grey-darken-2">
            {{ microsite?.description }}
          </div>
        </div>
      </div>

      <!-- Banner Photo Section -->
      <div class="mb-8">
        <h2 class="fs-18 font-weight-medium mb-6 d-flex align-center text-grey-darken-3">
          <v-icon icon="mdi-image-multiple-outline" size="20" class="mr-2"></v-icon>
          Banner photo
        </h2>

        <v-card flat class="rounded-lg overflow-hidden" elevation="0">
          <v-img :src="getImage(microsite?.banner_image, 'uploads/banner/')"
            :lazy-src="getImage(microsite?.banner_image, 'uploads/banner/')" cover height="300" class="banner-image">
            <div class="d-flex fill-height align-center justify-center banner-overlay">
              <div class="text-center text-white px-6">
                <h2 class="text-h4 font-weight-bold mb-3">{{ microsite?.business_name }}</h2>
                <p class="text-body-1">
                  {{ microsite?.description }}
                </p>
              </div>
            </div>
          </v-img>
        </v-card>
      </div>

      <!-- Social Links Section -->
      <div class="mb-8">
        <h2 class="fs-18 font-weight-medium mb-4 d-flex align-center text-grey-darken-3">
          <v-icon icon="mdi-share-variant-outline" size="20" class="mr-2"></v-icon>
          Social Links
        </h2>

        <v-row v-if="microsite?.social_links.length > 0">
          <v-col v-for="(link, index) in microsite.social_links" :key="index" cols="12" md="6" class="py-2">
            <div class="social-link-box">
              <div class="d-flex align-center">
                <v-avatar color="grey-lighten-4" size="48" rounded="lg" class="mr-3">
                  <v-icon :icon="getSocialIcon(link.name)" :color="getSocialColor(link.name)" size="24"></v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-caption text-grey-darken-1 mb-1">{{ link.name }}</div>
                  <div class="text-body-2 text-grey-darken-3 text-truncate" style="max-width: 400px;">{{ link.url }}
                    <v-tooltip activator="parent" location="bottom">{{ link.url }}</v-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-divider class="my-8"></v-divider>

      <!-- Services Section -->
      <div class="mb-8">
        <h2 class="fs-18 font-weight-medium mb-6 d-flex align-center text-grey-darken-3">
          <v-icon icon="mdi-briefcase-outline" size="20" class="mr-2"></v-icon>
          Services
        </h2>

        <div class="d-flex flex-wrap gap-3" v-if="microsite?.services.length > 0">
          <v-chip v-for="service in microsite.services" :key="service" color="deep-purple-accent-2"
            class="text-white px-4" size="large">
            {{ service.name }}
          </v-chip>
        </div>
      </div>

      <!-- Admin Comments Section -->
      <div class="mb-8">
        <h2 class="fs-18 font-weight-medium mb-4 d-flex align-center text-grey-darken-3">
          <v-icon icon="mdi-comment-text-outline" size="20" class="mr-2"></v-icon>
          Admin Comments
        </h2>
        <v-textarea v-model="adminComments" placeholder="Please review the microsite carefully and provide feedback"
          variant="outlined" rows="2" bg-color="grey-lighten-5" hide-details="auto"
          :error-messages="adminCommentsError"></v-textarea>
      </div>

      <!-- Action Buttons -->
      <v-row class="mt-8" justify="center">
        <v-col cols="12" sm="auto" class="d-flex justify-center">
          <v-btn color="error" class="text-white text-capitalize px-16" height="48" flat rounded="lg"
            @click="rejectMicrosite">
            Reject
          </v-btn>
        </v-col>
        <v-col cols="12" sm="auto" class="d-flex justify-center">
          <v-btn color="success" class="text-white text-capitalize px-16" height="48" flat rounded="lg"
            @click="approveMicrosite">
            Approve
          </v-btn>
        </v-col>
      </v-row>

      <!-- Note -->
      <div class="d-flex justify-center gap-4 mt-3">
        <p :class="$vuetify.display.smAndDown ? 'fs-14' : 'fs-16'">Once approved, microsite will be live within 24 hours
        </p>
      </div>
    </v-card>
    <v-snackbar v-model="showSuccess" color="success" timeout="3000" location="bottom center">
      {{ successMessage }}
    </v-snackbar>
  </app-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import api from '@/api';
import { getImage } from '@/utils/helpers';

const showSuccess = ref(false);
const successMessage = ref('');
const { validate, setErrors } = useForm();
const { value: adminComments, errorMessage: adminCommentsError } = useField('adminComments');

const microsite = ref(null);
const loading = ref(false);
const socialLinks = ref([]);
const services = ref([]);
const router = useRouter();
const route = useRoute();

const getSocialColor = (type) => {
  const colors = {
    'facebook': '#1877F2',
    'instagram': '#E4405F',
    'twitter': '#1DA1F2',
    'x': '#000000',
    'linkedin': '#0A66C2',
    'youtube': '#FF0000',
    'tiktok': '#000000',
    'whatsapp': '#25D366',
    'github': '#181717',
    'telegram': '#0088cc',
    'website': 'grey-darken-2'
  }
  return colors[type?.toLowerCase()] || 'grey-darken-2'
}

const getSocialIcon = (type) => {
  const icons = {
    'website': 'mdi-web',
    'tiktok': 'mdi-music-note',
    'twitter/x': 'mdi-twitter',
    'facebook': 'mdi-facebook',
    'instagram': 'mdi-instagram',
    'linkedin': 'mdi-linkedin',
    'youtube': 'mdi-youtube',
    'whatsapp': 'mdi-whatsapp',
    'github': 'mdi-github',
    'telegram': 'mdi-telegram'
  }
  return icons[type?.toLowerCase()] || 'mdi-' + type?.toLowerCase().replace(' ', '-')
}



const fetchMicrosite = async () => {
  loading.value = true;
  try {
    const uuid = route.params.uuid;
    const response = await api.get(`/admin/microsite/${uuid}`);
    microsite.value = response.data.data;
    // Map API response to component state
  } catch (error) {
    console.error("Error fetching microsite:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMicrosite();
});

const goBack = () => {
  router.back();
};

const rejectMicrosite = async () => {
  if (!adminComments.value) {
    setErrors({ adminComments: 'Rejection reason is required' });
    return;
  }

  // Check for 100 words (splitting by space)
  const wordCount = adminComments.value.trim().split(/\s+/).length;
  if (wordCount < 10) {
    setErrors({ adminComments: `Rejection reason must be at least 10 words. Current: ${wordCount} words.` });
    return;
  }

  try {
    const uuid = route.params.uuid;
    await api.put(`/admin/microsite/reject/${uuid}`, {
      rejection_reason: adminComments.value
    });

    successMessage.value = 'Microsite rejected successfully';
    showSuccess.value = true;

    setTimeout(() => {
      router.push({ name: 'PartnerDetails', params: { id: route.params.id } }); // Assuming redirection to partner details
    }, 600);
  } catch (error) {
    console.error('Error rejecting microsite:', error);
  }
};

const approveMicrosite = async () => {
  try {
    const uuid = route.params.uuid;
    await api.put(`/admin/microsite/approve/${uuid}`, {
      approval_reason: adminComments.value
    });

    successMessage.value = 'Microsite approved successfully!';
    showSuccess.value = true;

    setTimeout(() => {
      router.push({ name: 'PartnerDetails', params: { id: route.params.id } });
    }, 600);
  } catch (error) {
    console.error('Error approving microsite:', error);
  }
};
</script>

<style scoped>
.bg-grey-lighten-5 {
  background-color: #F9FAFB !important;
}

.fs-18 {
  font-size: 18px;
}

.fs-24 {
  font-size: 24px;
}

.text-box-style {
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  padding: 12px 16px;
  background-color: #FFFFFF;
  min-height: 60px;
  transition: all 0.2s ease;
}

.text-box-style:hover {
  border-color: #9CA3AF;
}

.social-link-box {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px 16px;
  background-color: #FFFFFF;
  transition: all 0.2s ease;
}

.social-link-box:hover {
  border-color: #D1D5DB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.product-launch-pill {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  color: white;
  padding: 14px 48px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
}

.detail-item {
  padding: 8px 0;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}

.banner-overlay {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
}

.banner-image {
  border: 1px solid #E0E0E0;
}
</style>