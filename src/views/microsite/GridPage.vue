<template>
    <div>
        <v-row v-if="loading">
            <v-col cols="12" md="4" v-for="n in 6" :key="n">
                <v-skeleton-loader class="mx-auto border rounded-lg" max-width="100%"
                    type="image, article"></v-skeleton-loader>
            </v-col>
        </v-row>
        <EmptyState v-else-if="microsites.length === 0" actionLabel="Create new microsite" @action="createMicrosite" />
        <v-row v-else>
            <v-col cols="12" md="4" v-for="(site, index) in microsites" :key="index">
                <v-card flat border class="rounded-lg overflow-hidden microsite-card cursor-pointer" height="100%"
                    @click="navigateToProfile(site.user.slug, site.slug)">
                    <v-img :src="getImage(site.banner_image, 'uploads/banner/')"
                        :lazy-src="getImage(site.banner_image, 'uploads/banner/')" height="200" cover
                        :class="site.bgColor" transition="fade-transition">
                        <div class="d-flex justify-end pa-2">
                            <v-chip :color="getStatusColor(site.status)"
                                class="text-uppercase font-weight-bold text-white" size="small" label variant="flat"
                                elevation="2" style="border: 1px solid white;">
                                {{ site.status }}
                            </v-chip>
                        </div>
                    </v-img>
                    <v-card-text class="pa-4">
                        <div class="d-flex align-center justify-space-between">
                            <h3 class="fs-22 font-weight-bold hover-text-primary transition-colors">{{ site.title }}
                            </h3>
                            <v-btn icon variant="text" size="small" @click.stop="copyUrl(site)" color="grey-darken-1">
                                <v-icon size="20" class="hover-text-primary transition-colors">mdi-content-copy</v-icon>
                                <v-tooltip activator="parent" location="top">Copy URL</v-tooltip>
                            </v-btn>
                        </div>
                        <p class="text-caption text-grey-darken-1 mt-2 mb-0 fs-14 font-weight-medium">
                            {{ site.description }}
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <v-snackbar v-model="snackbar" color="success" timeout="2000" location="bottom center">
        {{ snackbarText }}
    </v-snackbar>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue';
import { getImage } from '@/utils/helpers';
import EmptyState from '@/components/EmptyState.vue';

const props = defineProps({
    microsites: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
});



const router = useRouter();
const snackbar = ref(false);
const snackbarText = ref('');

const copyUrl = (site) => {
    const url = `${window.location.origin}/${site.user.slug}/${site.slug}`;
    navigator.clipboard.writeText(url).then(() => {
        snackbarText.value = "Successfully copied URL";
        snackbar.value = true;
    }).catch(err => {
        console.error('Failed to copy: ', err);
        snackbarText.value = "Failed to copy URL";
        snackbar.value = true;
    });
};

const createMicrosite = () => {
    router.push('/create-microsite');
};

const navigateToProfile = (username, slug) => {
    router.push(`/${username}/${slug}`);
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Approved': return 'success';
        case 'Pending': return 'warning';
        case 'Rejected': return 'error';
        case 'Active': return 'info';
        default: return 'grey';
    }
};
</script>

<style scoped>
/* Card Hover Transitions */
.card-hover,
.microsite-card,
.card {
    transition: all 0.3s ease-in-out !important;
}

.card-hover:hover,
.microsite-card:hover,
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
    border-color: var(--primary-color) !important;
}

.transition-colors {
    transition: color 0.3s ease-in-out;
}

.microsite-card:hover .hover-text-primary {
    color: var(--primary-color) !important;
}
</style>
