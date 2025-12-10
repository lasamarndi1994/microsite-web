<template>
    <app-layout>
        <v-card flat class="card-padding rounded-xl" min-height="80vh">
            <!-- Welcome Section -->
            <v-row class="mb-4" align="center">
                <v-col cols="12" lg="8">
                    <h1 class="font-weight-bold text-grey-darken-3"
                        :class="$vuetify.display.smAndDown ? 'fs-20' : 'fs-24'">Welcome Back</h1>
                </v-col>
                <v-col cols="12" lg="4" class="d-none d-lg-flex justify-end">
                    <v-btn variant="outlined" style="border-color: #7f56da; color: #7f56da" class="text-capitalize mr-4"
                        height="44" @click="DraftMicrosite" max-width="200px">
                        <template v-slot:prepend>
                            <v-icon size="16">mdi-file-document-outline</v-icon>
                        </template>
                        Drafts
                    </v-btn>
                    <v-btn class="btn-primary text-white text-capitalize" height="44" flat @click="createMicrosite">
                        <template v-slot:prepend>
                            <div class="d-inline-flex align-center justify-center mr-2"
                                style="width: 20px; height: 20px; border-radius: 30%; border: 1px solid white;">
                                <v-icon size="16" color="white">mdi-plus</v-icon>
                            </div>
                        </template>
                        Create new microsite
                    </v-btn>
                </v-col>
            </v-row>

            <v-row class="mb-4 d-lg-none">
                <v-col cols="12" sm="6">
                    <v-btn variant="outlined" style="border-color: #7f56da; color: #7f56da"
                        class="text-capitalize w-100" height="44" @click="DraftMicrosite">
                        <template v-slot:prepend>
                            <v-icon size="16">mdi-file-document-outline</v-icon>
                        </template>
                        Drafts
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-btn class="btn-primary text-white text-capitalize w-100" height="44" flat
                        @click="createMicrosite">
                        <template v-slot:prepend>
                            <div class="d-inline-flex align-center justify-center mr-2"
                                style="width: 20px; height: 20px; border-radius: 30%; border: 1px solid white;">
                                <v-icon size="16" color="white">mdi-plus</v-icon>
                            </div>
                        </template>
                        Create new microsite
                    </v-btn>
                </v-col>
            </v-row>

            <!-- Analytics Section -->
            <h2 class="fs-18 font-weight-bold mb-4">Analytics</h2>
            <v-row class="mb-8">
                <v-col cols="12" md="4">
                    <v-card flat border class="pa-4 rounded-lg card-hover">
                        <div class="d-flex align-center">
                            <v-avatar color="deep-purple-lighten-5" rounded="lg" size="48" class="mr-4">
                                <img src="@/assets/images/Frame12.svg" alt="Visitors" width="44" height="44" />
                            </v-avatar>
                            <div>
                                <div class="fs-11 text-grey">Visitors</div>
                                <div class="fs-21 font-weight-bold">1,234</div>
                            </div>
                            <v-spacer></v-spacer>
                            <v-chip color="success" size="small" variant="tonal" class="px-2">
                                + 36% <v-icon end icon="mdi-arrow-up" size="small"></v-icon>
                            </v-chip>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4">
                    <v-card flat border class="pa-4 rounded-lg card-hover">
                        <div class="d-flex align-center">
                            <v-avatar color="deep-purple-lighten-5" rounded="lg" size="48" class="mr-4">
                                <img src="@/assets/images/Frame54.svg" alt="Engagement" width="44" height="44" />
                            </v-avatar>
                            <div>
                                <div class="fs-11 text-grey">Engagement</div>
                                <div class="fs-21 font-weight-bold">1,234</div>
                            </div>
                            <v-spacer></v-spacer>
                            <v-chip color="success" size="small" variant="tonal" class="px-2">
                                + 36% <v-icon end icon="mdi-arrow-up" size="small"></v-icon>
                            </v-chip>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4">
                    <v-card flat border class="pa-4 rounded-lg card-hover">
                        <div class="d-flex align-center">
                            <v-avatar color="deep-purple-lighten-5" rounded="lg" size="48" class="mr-4">
                                <img src="@/assets/images/Frame54(1).svg" alt="Conversions" width="44" height="44" />
                            </v-avatar>
                            <div>
                                <div class="fs-11 text-grey">Conversions</div>
                                <div class="fs-21 font-weight-bold">1,234</div>
                            </div>
                            <v-spacer></v-spacer>
                            <v-chip color="success" size="small" variant="tonal" class="px-2">
                                + 36% <v-icon end icon="mdi-arrow-up" size="small"></v-icon>
                            </v-chip>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <div class="bg-grey-lighten-4 rounded-lg pa-1 mb-6">
                <v-row no-gutters>
                    <v-col cols="6" sm="auto">
                        <v-btn variant="text"
                            class="text-capitalize px-md-6 px-3 text-body-2 text-sm-body-1 mobile-hover" rounded="lg"
                            height="44" width="150"
                            :class="activeTab === 'my-microsites' ? 'btn-primary text-white' : 'text-grey-darken-1'"
                            @click="updateActiveTab('my-microsites')">
                            My Microsites
                        </v-btn>
                    </v-col>
                    <v-col cols="6" sm="auto">
                        <v-btn class="text-capitalize px-md-6 px-3 text-body-2 text-sm-body-1 ms-sm-3 ms-0 mobile-hover"
                            variant="flat" rounded="lg" height="44" width="200"
                            :class="activeTab === 'pending' ? 'btn-primary text-white' : ''"
                            @click="updateActiveTab('pending')">
                            Pending Microsites
                        </v-btn>
                    </v-col>
                </v-row>
            </div>

            <!-- Microsites Grid -->
            <v-row v-if="isLoading && activeTab === 'my-microsites'">
                <v-col cols="12" md="4" v-for="n in 6" :key="n">
                    <v-skeleton-loader class="mx-auto border rounded-lg" max-width="100%"
                        type="image, article"></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row v-else-if="activeTab === 'my-microsites'">
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
                                <v-icon :class="{ 'font-weight-bold': index === 0 }"
                                    class="hover-text-primary transition-colors">mdi-arrow-top-right</v-icon>
                            </div>
                            <p class="text-caption text-grey-darken-1 mt-2 mb-0 fs-14 font-weight-medium">
                                {{ site.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <MicrositeListPage v-else :microsites="microsites" :loading="isLoading" @filter-change="handleFilterChange"
                @refresh="refresh" />
        </v-card>
    </app-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import api from "@/api";
import { getImage } from '@/utils/helpers'

import MicrositeListPage from "@/views/MicrositeListPage.vue";


const router = useRouter();
const activeTab = ref('my-microsites');
const selectedFilter = ref(null);
const selectedFilterLabel = ref(null);
const isLoading = ref(false);

const createMicrosite = () => {
    router.push("/create-microsite");
};

const DraftMicrosite = () => {
    router.push("/drafts-microsite");
};

const navigateToProfile = (username, slug) => {
    console.log(username, slug);
    router.push(`/${username}/${slug}`);
};

const microsites = ref([]);

const fetchMicrosites = async (status = null) => {
    isLoading.value = true;
    try {
        let url = '/microsite/lists?page=1&limit=18';
        if (status) {
            url += `&status=${status}`;
        }

        const response = await api.get(url);
        const colors = ['bg-grey-lighten-2', 'bg-deep-purple-lighten-4', 'bg-purple-lighten-4', 'bg-blue-lighten-4', 'bg-teal-lighten-4'];
        const data = response.data.data || response.data;
        microsites.value = Array.isArray(data) ? data.map(site => ({
            ...site,
            bgColor: site.bgColor || colors[Math.floor(Math.random() * colors.length)],
        })) : [];
    } catch (error) {
        console.error('Error fetching microsites:', error);
    } finally {
        isLoading.value = false;
    }
};

const handleFilterChange = (status) => {
    // Assuming status values from filter match API expected values (active, pending, rejected)
    // Capitalize if API expects capitalized status, or pass as is if API handles it.
    const formattedStatus = status ? status.charAt(0).toUpperCase() + status.slice(1) : null;
    fetchMicrosites(formattedStatus);
};

const updateActiveTab = (tab) => {
    activeTab.value = tab;
    if (tab === 'my-microsites') {
        fetchMicrosites();
    } else if (tab === 'pending') {
        fetchMicrosites('Pending');
    }
};

onMounted(() => {
    fetchMicrosites();
});

const getStatusColor = (status) => {
    switch (status) {
        case 'Active': return 'success';
        case 'Pending': return 'warning';
        case 'Approved': return 'info';
        default: return 'grey';
    }
};
const refresh = (uuid) => {
    if (uuid) {
        const index = microsites.value.findIndex(item => item.uuid === uuid);
        if (index !== -1) {
            microsites.value.splice(index, 1);
        }
    } else {
        fetchMicrosites();
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
