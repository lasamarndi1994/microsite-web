<template>
    <div>
        <v-row class="mb-6" align="center">
            <v-col cols="12" md>
                <v-text-field v-model="searchQuery" density="compact" variant="outlined" label="Search"
                    prepend-inner-icon="mdi-magnify" hide-details single-line class="bg-white rounded-lg search-input"
                    max-width="450px" @update:model-value="debouncedSearch" clearable
                    @click:clear="onClear"></v-text-field>
            </v-col>
            <v-col cols="12" md="auto">
                <v-btn variant="outlined" prepend-icon="mdi-filter-variant"
                    class="ml-md-4 text-capitalize w-100 w-md-auto" height="48" color="grey-darken-3"
                    style="border-color: #7f56da; color: #7f56da">
                    {{ selectedFilterLabel || 'Filters' }}
                    <v-menu activator="parent">
                        <v-list class="py-3 px-2" min-width="220">
                            <v-list-item v-for="(filter, index) in filterOptions" :key="index" :value="filter.value"
                                class="mb-2 filter-item rounded-lg" @click="selectFilter(filter.value)">
                                <template v-slot:default>
                                    <div class="d-flex align-center justify-space-between w-100">
                                        <v-chip :color="filter.color" size="small" variant="flat" class="px-3">
                                            <v-icon :icon="filter.icon" size="16" class="mr-1"></v-icon>
                                            <span class="text-capitalize font-weight-medium">{{ filter.label }}</span>
                                        </v-chip>
                                        <v-icon v-if="selectedFilter === filter.value" icon="mdi-check-circle"
                                            color="success" size="20"></v-icon>
                                    </div>
                                </template>
                            </v-list-item>
                            <v-divider class="my-2"></v-divider>
                            <v-list-item class="filter-item rounded-lg" @click="clearFilter">
                                <template v-slot:default>
                                    <div class="d-flex align-center">
                                        <v-icon icon="mdi-close-circle-outline" size="18"
                                            class="mr-2 text-grey"></v-icon>
                                        <span class="text-body-2 text-grey-darken-2">Clear Filter</span>
                                    </div>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
            </v-col>
        </v-row>

        <!-- Microsites List -->
        <EmptyState v-if="!loading && localMicrosites.length === 0" actionLabel="Create new microsite"
            @action="createMicrosite" />
        <v-card v-else flat border class="rounded-lg">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left text-caption font-weight-bold">Microsites</th>
                        <th class="text-left text-caption font-weight-bold">Status</th>
                        <th class="text-left text-caption font-weight-bold">Last Update</th>
                        <th class="text-center text-caption font-weight-bold"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="5" class="py-4">
                            <v-skeleton-loader type="table-row-divider@3"></v-skeleton-loader>
                        </td>
                    </tr>

                    <template v-else>

                        <tr v-for="(item, index) in localMicrosites" :key="index">
                            <td class="py-4">
                                <div class="d-flex align-center">
                                    <v-avatar color="blue-lighten-5" rounded="lg" size="40" class="mr-4">
                                        <!-- Use item.image if available, else default icon -->
                                        <v-img v-if="item.banner_image"
                                            :src="getImage(item.banner_image, 'uploads/banner/')"
                                            :lazy-src="getImage(item.banner_image, 'uploads/banner/')" cover
                                            transition="fade-transition">

                                        </v-img>
                                        <v-icon v-else color="blue">mdi-web</v-icon>
                                    </v-avatar>

                                    <div class="cursor-pointer" @click="navigateToProfile(item.slug)">
                                        <div class="text-subtitle-2 font-weight-bold text-truncate"
                                            style="max-width: 350px;">
                                            {{
                                                item.title }}

                                        </div>
                                        <div class="text-caption text-grey">{{ item.sub_title }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <v-chip :color="getStatusColor(item.status)" size="small" variant="flat"
                                    class="px-2 text-white font-weight-bold">
                                    <span class="text-capitalize">{{ item.status }}</span>
                                </v-chip>
                            </td>
                            <td class="text-body-2 text-grey-darken-1">{{ formatDate(item.updated_at || item.created_at)
                                }}
                            </td>
                            <td class="text-right">

                                <v-btn icon="mdi-delete-outline" variant="text" color="grey" size="large"
                                    @click="confirmDelete(item)">
                                    <v-icon>mdi-delete-outline</v-icon>
                                    <v-tooltip activator="parent" location="bottom">Delete</v-tooltip>
                                </v-btn>
                                <v-btn icon="mdi-pencil-outline" variant="text" @click="navigateEditProfile(item.uuid)"
                                    color="grey" size="large">
                                    <v-icon>mdi-pencil-outline</v-icon>
                                    <v-tooltip activator="parent" location="bottom">Edit</v-tooltip>
                                </v-btn>

                                <v-btn icon="mdi-eye-outline" variant="text" color="grey" size="large"
                                    @click="openPreview(item)">
                                    <v-icon>mdi-eye-outline</v-icon>
                                    <v-tooltip activator="parent" location="bottom">Preview</v-tooltip>
                                </v-btn>

                                <v-btn v-if="item.status === 'Approved'" icon="mdi-content-copy" variant="text"
                                    color="grey" size="large" @click="copyUrl(item)">
                                    <v-icon>mdi-content-copy</v-icon>
                                    <v-tooltip activator="parent" location="bottom">Copy URL</v-tooltip>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </v-table>
        </v-card>

        <!-- Preview Dialog -->
        <v-dialog v-model="showPreview" max-width="600" scroll-strategy="none">
            <v-card class="rounded-xl pa-6">
                <div class="d-flex justify-space-between align-center mb-6">
                    <h3 class="text-h6 font-weight-bold">
                        {{ selectedMicrosite?.status === 'Rejected' ? 'Rejection Details' : 'Microsite Details' }}</h3>
                    <v-btn icon="mdi-close" variant="text" density="compact" class="mt-n5"
                        @click="showPreview = false"></v-btn>
                </div>

                <v-row class="mb-4" v-if="selectedMicrosite">
                    <v-col cols="4">
                        <div class="text-caption text-grey mb-1">Microsite</div>
                        <div class="font-weight-bold">{{ selectedMicrosite.title }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-caption text-grey mb-1">Status</div>
                        <div class="font-weight-bold"
                            :class="selectedMicrosite.status === 'Rejected' ? 'text-red' : 'text-green'">{{
                                selectedMicrosite.status }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-caption text-grey mb-1">Last Updated</div>
                        <div class="fs-14">{{ formatDate(selectedMicrosite.updated_at) }}</div>
                    </v-col>
                </v-row>

                <div v-if="selectedMicrosite?.rejection_reason" class="mb-6">
                    <div class="text-caption text-grey mb-2">Reason from Admin</div>
                    <div class="bg-grey-lighten-5 pa-4 rounded-lg border text-body-2">
                        {{ selectedMicrosite.rejection_reason }}
                    </div>
                </div>

                <v-btn height="44" class="text-none mb-4 btn-primary text-white " size="large"
                    @click="showPreview = false" block>
                    Close
                </v-btn>


            </v-card>
        </v-dialog>

        <v-dialog v-model="showDeleteConfirm" max-width="400">
            <v-card class="rounded-xl pa-6">
                <div class="d-flex justify-space-between align-center mb-6">
                    <h3 class="fs-18 fw-500 mb-0">Delete Campaign Landing?</h3>
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
                            @click="deleteItem">
                            Delete
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" color="success" timeout="2000" location="bottom center">
            {{ snackbarText }}
        </v-snackbar>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getImage, formatDate } from '@/utils/helpers';
import api from '@/api';
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

const selectedFilter = ref(null);
const selectedFilterLabel = ref(null);

const showPreview = ref(false);
const selectedMicrosite = ref(null);
const showDeleteConfirm = ref(false);
const itemToDelete = ref(null);
const snackbar = ref(false);
const snackbarText = ref('');
const searchQuery = ref('');
const localMicrosites = ref([]);

// Sync local microsites with props initially and when props change
watch(() => props.microsites, (newVal) => {
    if (!searchQuery.value) {
        localMicrosites.value = newVal;
    }
}, { immediate: true });

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const performSearch = async () => {
    if (!searchQuery.value) {
        localMicrosites.value = props.microsites;
        return;
    }

    try {
        const response = await api.get(`/microsite/search?name=${searchQuery.value}`);
        if (response.data && response.data.data) {
            localMicrosites.value = response.data.data;
        } else {
            localMicrosites.value = [];
        }
    } catch (error) {

        localMicrosites.value = [];
    }
};

const debouncedSearch = debounce(performSearch, 500);

const onClear = () => {
    searchQuery.value = '';
    localMicrosites.value = props.microsites;
};

const copyUrl = (item) => {
    const url = `${window.location.origin}/${item.slug}`;
    navigator.clipboard.writeText(url).then(() => {
        snackbarText.value = "Successfully copied URL";
        snackbar.value = true;
    }).catch(() => {

        snackbarText.value = "Failed to copy URL";
        snackbar.value = true;
    });
};

const openPreview = (item) => {
    if (item.status == 'Rejected') {
        selectedMicrosite.value = item;
        showPreview.value = true;

    }
    else {
        router.push(`/${item.slug}`);

    }

};

const confirmDelete = (item) => {
    itemToDelete.value = item;
    showDeleteConfirm.value = true;
};

const navigateToProfile = (slug) => {
    router.push(`/${slug}`);
};

const createMicrosite = () => {
    router.push('/create-microsite');
};

const deleteItem = async () => {
    if (!itemToDelete.value) return;

    try {
        await api.delete(`/microsite/delete/${itemToDelete.value.uuid}`);
        emit('refresh', itemToDelete.value.uuid);
        showDeleteConfirm.value = false;
        itemToDelete.value = null;
    } catch (error) {
        console.error('Error deleting microsite:', error);
        // Optionally handle error (e.g. show snackbar)
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Approved': return 'success';
        case 'Pending': return 'warning';
        case 'Rejected': return 'error';
        case 'Approved': return 'info';
        default: return 'grey';
    }
};



const filterOptions = ref([
    {
        label: 'Approved',
        value: 'approved',
        color: 'green-lighten-4 text-green-darken-4',
        icon: 'mdi-check-circle'
    },
    {
        label: 'Rejected',
        value: 'rejected',
        color: 'red-lighten-4 text-red-darken-4',
        icon: 'mdi-close-circle'
    },
    {
        label: 'Pending',
        value: 'pending',
        color: 'orange-lighten-4 text-orange-darken-4',
        icon: 'mdi-clock-outline'
    }
]);

const emit = defineEmits(['filter-change', 'refresh']);

const selectFilter = (value) => {
    selectedFilter.value = value;
    const filter = filterOptions.value.find(f => f.value === value);
    selectedFilterLabel.value = filter ? filter.label : null;
    emit('filter-change', value);
};

const navigateEditProfile = (uuid) => {
    router.push(`/update-microsite-profile/${uuid}`);
}

const clearFilter = () => {
    selectedFilter.value = null;
    selectedFilterLabel.value = null;
    emit('filter-change', null);
};

</script>

<style scoped></style>
