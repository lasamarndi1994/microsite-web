<template>
    <app-layout>
        <v-card flat class="card-padding rounded-xl" min-height="80vh">
            <div class="d-flex align-center mb-6">
                <v-btn icon="mdi-arrow-left" variant="text" @click="$router.back()" class="mr-2"></v-btn>
                <h1 class="font-weight-bold text-grey-darken-3 fs-24">My Microsites</h1>
            </div>

            <v-text-field v-model="searchQuery" density="compact" variant="outlined" label="Search Microsites"
                prepend-inner-icon="mdi-magnify" single-line hide-details class="mb-4 bg-white" style="max-width: 400px"
                rounded="lg" clearable></v-text-field>

            <!-- Table Section -->
            <v-card flat border class="rounded-lg">
                <div class="table-responsive">
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left text-caption text-grey">Microsite</th>
                                <th class="text-left text-caption text-grey">Status</th>
                                <th class="text-left text-caption text-grey">Created At</th>
                                <th class="text-left text-caption text-grey">Count</th>
                                <th class="text-right text-caption text-grey"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isLoading">
                                <td colspan="5" class="py-4">
                                    <v-skeleton-loader type="table-row-divider@3"></v-skeleton-loader>
                                </td>
                            </tr>
                            <tr v-if="!isLoading && filteredMicrosites.length === 0">
                                <td colspan="5" class="text-center py-8">
                                    <div class="d-flex flex-column align-center justify-center">
                                        <v-icon icon="mdi-magnify-remove-outline" size="48"
                                            color="grey-lighten-1 mb-2"></v-icon>
                                        <div class="text-body-1 text-grey-darken-1">Data not found.</div>
                                    </div>
                                </td>
                            </tr>
                            <template v-for="(item, index) in filteredMicrosites" :key="index">
                                <tr>
                                    <td class="py-4">
                                        <div class="d-flex align-center">
                                            <v-avatar size="40" class="mr-4" rounded="lg">
                                                <v-img :src="getImage(item.banner_image, 'uploads/banner/')"
                                                    cover></v-img>
                                            </v-avatar>
                                            <div>
                                                <div class="text-subtitle-2 font-weight-bold text-truncate"
                                                    style="max-width: 300px;">{{ item.title }}</div>
                                                <div class="text-caption text-grey text-truncate"
                                                    style="max-width: 300px;">
                                                    {{ item.subtitle }}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <v-chip :color="getStatusColor(item.status)" size="small" variant="flat"
                                            class="px-2 text-white font-weight-bold">
                                            <span class="text-capitalize">{{ item.status }}</span>
                                        </v-chip>
                                    </td>
                                    <td class="text-body-2 text-grey-darken-1">{{ formatDate(item.updated_at) }}</td>
                                    <td>
                                        <div class="d-flex align-center">
                                            <v-chip color="blue-lighten-5" class="text-blue-darken-2 mr-2" size="small"
                                                label>
                                                <v-icon start icon="mdi-eye" size="14"></v-icon>
                                                {{ item.view_count || 0 }}
                                                <v-tooltip activator="parent" location="bottom">
                                                    No of Views
                                                </v-tooltip>
                                            </v-chip>
                                            <v-chip color="purple-lighten-5" class="text-purple-darken-2 mr-2"
                                                size="small" label>
                                                <v-icon start icon="mdi-cursor-default-click" size="14"></v-icon>
                                                {{ item.engagement_count || 0 }}
                                                <v-tooltip activator="parent" location="bottom">
                                                    No of Engagement
                                                </v-tooltip>
                                            </v-chip>
                                            <v-chip color="green-lighten-5" class="text-green-darken-2" size="small"
                                                label>
                                                <v-icon start icon="mdi-account-group" size="14"></v-icon>
                                                {{ item.lead_count || 0 }}
                                                <v-icon end
                                                    :icon="expandedMicrosite === item.uuid ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                                    size="20" class="ml-1 cursor-pointer"
                                                    @click.stop="toggleExpansion(item)"></v-icon>
                                                <v-tooltip activator="parent" location="bottom">
                                                    No of Leads
                                                </v-tooltip>
                                            </v-chip>
                                        </div>
                                    </td>

                                    <td class="text-right">
                                        <v-btn variant="text" color="primary" size="small"
                                            @click="navigateToProfile(item.user_slug, item.slug)"
                                            class="text-capitalize">
                                            View
                                        </v-btn>
                                        <v-btn icon="mdi-content-copy" variant="text" color="grey" size="small"
                                            @click="copyToClipboard(item.user_slug, item.slug)">
                                        </v-btn>
                                    </td>
                                </tr>

                                <tr v-if="expandedMicrosite === item.uuid" class="bg-grey-lighten-5">
                                    <td colspan="5" class="pa-4">
                                        <LeadDetails :leads="leads[item.id]" :loading="leadsLoading" />
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </v-table>
                </div>
            </v-card>
        </v-card>
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000" location="bottom center">
            {{ snackbar.text }}
        </v-snackbar>
    </app-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from "@/api";
import { getImage, formatDate } from '@/utils/helpers';
import LeadDetails from '@/components/LeadDetails.vue';

const router = useRouter();
const microsites = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');
const snackbar = ref({
    show: false,
    text: '',
    color: 'success'
});

const fetchMicrosites = async () => {
    isLoading.value = true;
    try {
        const response = await api.get("/microsite/approved");
        microsites.value = response.data.data || [];
    } catch (error) {
        console.error('Error fetching microsites:', error);
    } finally {
        isLoading.value = false;
    }
};

const filteredMicrosites = computed(() => {
    if (!searchQuery.value) {
        return microsites.value;
    }
    const query = searchQuery.value.toLowerCase();
    return microsites.value.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query))
    );
});

const getStatusColor = (status) => {
    switch (status) {
        case 'Approved': return 'success';
        case 'Pending': return 'warning';
        case 'Rejected': return 'error';
        default: return 'grey';
    }
};

const navigateToProfile = (user_slug, slug) => {
    router.push(`/${user_slug}/${slug}`);
};

const expandedMicrosite = ref(null);
const leads = ref({});
const leadsLoading = ref(false);

const toggleExpansion = async (item) => {
    if (expandedMicrosite.value === item.uuid) {
        expandedMicrosite.value = null;
    } else {
        expandedMicrosite.value = item.uuid;
        if (!leads.value[item.uuid]) {
            await fetchLeads(item.id);
        }
    }
};

const fetchLeads = async (uuid) => {
    leadsLoading.value = true;
    try {
        const response = await api.get(`/microsite/${uuid}/leads`);
        leads.value[uuid] = response.data.data || [];
    } catch (error) {
        leads.value[uuid] = [];
    } finally {
        leadsLoading.value = false;
    }
};

const copyToClipboard = (userSlug, slug) => {
    const url = `${window.location.origin}/${userSlug}/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
        snackbar.value = {
            show: true,
            text: 'Link copied to clipboard',
            color: 'success'
        };
    }).catch(err => {
        snackbar.value = {
            show: true,
            text: 'Failed to copy link',
            color: 'error'
        };
    });
};


onMounted(() => {
    fetchMicrosites();
});
</script>

<style scoped>
.card-padding {
    padding: 32px;
}

.table-responsive {
    overflow-x: auto;
}
</style>
