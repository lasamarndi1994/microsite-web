<template>
    <app-layout>
        <v-card flat class="card-padding rounded-xl" min-height="80vh">
            <!-- Header Section -->
            <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center">
                    <v-btn icon="mdi-arrow-left" variant="text" class="mr-2" @click="router.back()"></v-btn>
                    <h1 class="font-weight-bold text-grey-darken-3 fs-24">Drafts microsite</h1>
                </div>
                <v-btn class="btn-primary text-white text-capitalize" height="44" flat @click="createMicrosite">
                    <template v-slot:prepend>
                        <div class="d-inline-flex align-center justify-center mr-2"
                            style="width: 20px; height: 20px; border-radius: 30%; border: 1px solid white;">
                            <v-icon size="16" color="white">mdi-plus</v-icon>
                        </div>
                    </template>
                    Create new microsite
                </v-btn>
            </div>

            <!-- Search Section -->
            <v-row class="mb-6">
                <v-col cols="12" md="6">
                    <v-text-field v-model="searchQuery" density="compact" variant="outlined" label="Search"
                        prepend-inner-icon="mdi-magnify" hide-details single-line
                        class="bg-white rounded-lg search-input" max-width="60%" @update:model-value="debouncedSearch"
                        clearable @click:clear="onClear"></v-text-field>
                </v-col>
            </v-row>

            <!-- Microsites List -->
            <EmptyState v-if="!loading && microsites.length === 0" @create="createMicrosite" />
            <v-card v-else flat border class="rounded-lg">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left text-caption text-grey pl-6" style="width: 50%;">Microsites</th>
                            <th class="text-left text-caption text-grey" style="width: 30%;">Last Update</th>
                            <th class="text-right text-caption text-grey pr-6" style="width: 20%;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="loading">
                            <tr v-for="n in 5" :key="n">
                                <td class="py-4 pl-6">
                                    <div class="d-flex align-center">
                                        <v-skeleton-loader type="avatar" width="40" height="40"
                                            class="mr-4 ma-0"></v-skeleton-loader>
                                        <div class="w-100">
                                            <v-skeleton-loader type="text" width="60%" class="ma-0 ml-2"
                                                height="14"></v-skeleton-loader>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <v-skeleton-loader type="text" width="100" class="ma-0"></v-skeleton-loader>
                                </td>
                                <td class="text-right pr-6">
                                    <div class="d-flex justify-end">
                                        <v-skeleton-loader type="chip" width="0" height="0"
                                            class="ml-2 ma-0"></v-skeleton-loader>
                                        <v-skeleton-loader type="chip" width="0" height="0"
                                            class="ml-2 ma-0"></v-skeleton-loader>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr v-for="(item, index) in microsites" :key="index">
                                <td class="py-4 pl-6">
                                    <div class="d-flex align-center">
                                        <v-avatar color="blue-lighten-5" rounded="lg" size="40" class="mr-4">
                                            <v-img v-if="item.banner_image"
                                                :src="getImage(item.banner_image, 'uploads/banner/')"
                                                :lazy-src="getImage(item.banner_image, 'uploads/banner/')" cover
                                                transition="fade-transition">

                                            </v-img>
                                            <v-icon v-else color="blue">mdi-web</v-icon>
                                        </v-avatar>

                                        <div class="cursor-pointer" @click="navigateEditProfile(item.uuid)">
                                            <div class="text-subtitle-2 font-weight-bold">{{ item.title }}</div>
                                            <div class="text-caption text-grey">{{ item.sub_title || item.user?.web_url
                                                }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-body-2 text-grey-darken-1">{{ formatDate(item.updated_at ||
                                    item.created_at) }}</td>
                                <td class="text-right pr-6">
                                    <v-btn icon="mdi-delete-outline" variant="text" color="grey" size="default"
                                        @click="confirmDelete(item)"></v-btn>
                                    <v-btn icon="mdi-pencil-outline" variant="text"
                                        @click="navigateEditProfile(item.uuid)" color="grey" size="default"></v-btn>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </v-table>
            </v-card>

            <!-- Delete Confirmation Dialog -->
            <v-dialog v-model="showDeleteConfirm" max-width="400">
                <v-card class="rounded-xl pa-6">
                    <div class="d-flex justify-space-between align-center mb-6">
                        <h3 class="fs-18 fw-500 mb-0">Delete Microsite?</h3>
                        <v-btn icon="mdi-close" variant="text" density="compact" class="mt-n5"
                            @click="showDeleteConfirm = false"></v-btn>
                    </div>

                    <p class="fs-14 fw-400 text-grey mb-6">
                        Are you sure you want to delete this microsite?<br> This action cannot be undone.
                    </p>

                    <v-row class="gx-2">
                        <v-col cols="6">
                            <v-btn variant="outlined" class="w-100 text-capitalize border" height="44"
                                @click="showDeleteConfirm = false">
                                Cancel
                            </v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn color="red" class="w-100 text-white text-capitalize" flat height="44"
                                @click="deleteItem" :loading="deleteLoading">
                                Delete
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-dialog>
            <!--  -->
        </v-card>
    </app-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getImage, formatDate } from '@/utils/helpers';
import api from '@/api';
import EmptyState from '@/components/EmptyState.vue';

const router = useRouter();

const microsites = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const showDeleteConfirm = ref(false);
const itemToDelete = ref(null);
const deleteLoading = ref(false);


const createMicrosite = () => {
    router.push("/create-microsite");
};

const navigateEditProfile = (uuid) => {
    router.push(`/update-microsite-profile/${uuid}`);
};

const fetchDrafts = async () => {
    loading.value = true;
    try {
        let url = '/microsite/lists?status=Draft'; // Assuming backend supports this status
        const response = await api.get(url);
        const data = response.data.data || response.data;
        microsites.value = Array.isArray(data) ? data : [];
        if (searchQuery.value) {
            // Client side filtering if needed or API search
            microsites.value = microsites.value.filter(site =>
                site.title.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        }
    } catch (error) {

    } finally {
        loading.value = false;
    }
};

const performSearch = async () => {
    // If backend has search endpoint
    if (!searchQuery.value) {
        fetchDrafts();
        return;
    }

    // Simplistic search implementation - ideally backend search
    loading.value = true;
    try {
        const response = await api.get(`/microsite/search?name=${searchQuery.value}`);
        if (response.data && response.data.data) {
            fetchDrafts();
        } else {
            microsites.value = [];
        }
    } catch (error) {
        console.error("Search error:", error);
    } finally {
        loading.value = false;
    }
};

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// Modified to use client side filter for consistency with this specific page's constraint (only drafts)
// If there are many drafts, backend search with status is better.
const debouncedSearch = debounce(() => fetchDrafts(), 500);

const onClear = () => {
    searchQuery.value = '';
    fetchDrafts();
};

const confirmDelete = (item) => {
    itemToDelete.value = item;
    showDeleteConfirm.value = true;
};

const deleteItem = async () => {
    if (!itemToDelete.value) return;
    deleteLoading.value = true;
    try {
        await api.delete(`/microsite/delete/${itemToDelete.value.uuid}`);
        snackbarText.value = "Microsite deleted successfully";
        snackbarColor.value = "success";
        snackbar.value = true;
        showDeleteConfirm.value = false;
        itemToDelete.value = null;
        fetchDrafts(); // Refresh list
    } catch (error) {
        snackbar.value = true;
    } finally {
        deleteLoading.value = false;
    }
};

onMounted(() => {
    fetchDrafts();
});
</script>

<style scoped>
.search-input :deep(.v-field__outline__start) {
    border-radius: 8px 0 0 8px !important;
}

.search-input :deep(.v-field__outline__end) {
    border-radius: 0 8px 8px 0 !important;
}
</style>
