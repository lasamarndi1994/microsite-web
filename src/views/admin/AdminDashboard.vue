<template>
    <app-layout>
        <v-card flat class="card-padding rounded-xl" min-height="80vh">
            <!-- Header Section -->
            <v-row class="mb-6">
                <v-col cols="12">
                    <div class="d-flex align-center mb-1 flex-wrap">
                        <h1 class="font-weight-bold text-grey-darken-3 mb-1"
                            :class="$vuetify.display.smAndDown ? 'fs-20' : 'fs-24'">Admin Dashboard</h1>

                        <v-chip class="ml-4 custom-chip bg-purple-lighten-5 text-secondary-color" label size="small">
                            <span class="font-weight-bold">{{ totalRecords }} Partner</span>
                        </v-chip>
                    </div>
                    <p class="text-grey-darken-1"
                        :class="$vuetify.display.smAndDown ? 'text-subtitle-2' : 'text-subtitle-1'">
                        Manage and review microsite submissions efficiently
                    </p>
                </v-col>
            </v-row>

            <!-- Filters Section -->
            <v-row class="mb-6">
                <v-col cols="12" md="6">
                    <v-text-field v-model="search" placeholder="Search by email and mobile number"
                        prepend-inner-icon="mdi-magnify" variant="outlined" density="comfortable" hide-details
                        bg-color="white" class="rounded-lg" clearable></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-row align="center" class="flex-wrap">
                        <v-col cols="12" sm="12" class="d-flex justify-end">
                            <div class="d-flex align-center">
                                <v-text-field v-model="fromDate" type="date" variant="outlined" density="comfortable"
                                    min="2024-01-01" max="2050-12-31" hide-details bg-color="white" class="date-input"
                                    placeholder="DD/MM/YYYY" label="From Date" clearable></v-text-field>
                                <span class="text-grey-darken-1 mx-2">to</span>
                                <v-text-field v-model="toDate" type="date" variant="outlined" density="comfortable"
                                    min="2024-01-01" max="2050-12-31" hide-details bg-color="white" class="date-input"
                                    placeholder="DD/MM/YYYY" label="To Date" clearable></v-text-field>
                            </div>
                        </v-col>

                    </v-row>
                </v-col>
            </v-row>

            <!-- Table Section -->
            <v-card flat border class="rounded-lg">
                <v-data-table-server v-model:items-per-page="itemsPerPage" v-model:page="page" :headers="headers"
                    :items="partners" :items-length="totalRecords" :loading="loading" @update:options="fetchUsers"
                    class="admin-table" item-value="uuid" :items-per-page-options="itemsPerPageOptions">

                    <template v-slot:item.user_name="{ item }">
                        <div class="d-flex align-center py-2">
                            <v-avatar size="40" class="mr-4" :color="getAvatarColor(item.user_name)">
                                <span class="text-h6 text-white">{{
                                    item.user_name?.charAt(0).toUpperCase()
                                }}</span>
                            </v-avatar>
                            <div>
                                <div class="text-subtitle-2 font-weight-bold">{{ item.user_name }}</div>
                                <div class="text-caption text-grey">{{ item.email }}</div>
                            </div>
                        </div>
                    </template>

                    <template v-slot:item.mobile_number="{ item }">
                        <span class="text-body-2 text-grey-darken-1">{{ item.mobile_number }}</span>
                    </template>

                    <template v-slot:item.updated_at="{ item }">
                        <span class="text-body-2 text-grey-darken-1">{{ formatDate(item.updated_at) }}</span>
                    </template>

                    <template v-slot:item.microsite_count="{ item }">
                        <div class="d-flex align-center">
                            <v-chip color="green-lighten-5" class="text-green-darken-2 mr-2" size="small" label>
                                <v-icon start icon="mdi-check-circle" size="14"></v-icon>
                                {{ item.microsite_approved_count }}
                                <v-tooltip activator="parent" location="bottom">
                                    Microsite Approved
                                </v-tooltip>
                            </v-chip>
                            <v-chip color="red-lighten-5" class="text-red-darken-2 mr-2" size="small" label>
                                <v-icon start icon="mdi-close-circle" size="14"></v-icon>
                                {{ item.microsite_rejected_count }}
                                <v-tooltip activator="parent" location="bottom">
                                    Microsite Rejected
                                </v-tooltip>
                            </v-chip>
                            <v-chip color="orange-lighten-5" class="text-orange-darken-2" size="small" label>
                                <v-icon start icon="mdi-clock-outline" size="14"></v-icon>
                                {{ item.microsite_pending_count }}
                                <v-tooltip activator="parent" location="bottom">
                                    Microsite Pending
                                </v-tooltip>
                            </v-chip>
                        </div>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <div class="text-right">
                            <v-btn variant="text" color="grey" size="large" @click="viewPartner(item)"
                                class="fs-14 fw-500 text-secondary-color text-decoration-underline"
                                style="text-transform: none;">View</v-btn>
                        </div>
                    </template>

                    <template v-slot:no-data>
                        <div class="d-flex flex-column align-center justify-center py-8">
                            <v-icon icon="mdi-magnify-remove-outline" size="48" color="grey-lighten-1 mb-2"></v-icon>
                            <div class="text-body-1 text-grey-darken-1">Data not found.</div>
                        </div>
                    </template>

                </v-data-table-server>
            </v-card>
        </v-card>
    </app-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';
import { formatDate } from '@/utils/helpers';
const router = useRouter();

const search = ref('');
const fromDate = ref('');
const toDate = ref('');
const selectedFilter = ref(null);
const selectedFilterLabel = ref(null);
const loading = ref(false);
const page = ref(1);
const totalPages = ref(1);

// Pagination
const itemsPerPage = ref(10);
const itemsPerPageOptions = [
    { value: 10, title: '10' },
    { value: 20, title: '20' },
    { value: 50, title: '50' },
    { value: 100, title: '100' },
    { value: 1000, title: '1000' }
];

const headers = [
    { title: 'Partner', key: 'user_name', align: 'start', sortable: false },
    { title: 'Mobile no', key: 'mobile_number', align: 'start', sortable: false },
    { title: 'Last update', key: 'updated_at', align: 'start', sortable: false },
    { title: 'Microsite Count', key: 'microsite_count', align: 'start', sortable: false },
    { title: '', key: 'actions', align: 'end', sortable: false },
];

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

const totalRecords = ref(0);

const partners = ref([]);

// Debounce function
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// Watch for search or filter changes to reset page and fetch
watch([selectedFilter, fromDate, toDate], () => {
    page.value = 1;
    fetchUsers();
});

// Debounced watch for search
watch(search, debounce(() => {
    page.value = 1;
    fetchUsers();
}, 500));

const minDate = '2025-01-01';

const maxDate = '9999-12-31';

watch(fromDate, (newVal) => {
    if (newVal) {
        if (newVal < minDate) {
            fromDate.value = minDate;
        } else if (newVal > maxDate) {
            fromDate.value = maxDate;
        }
    }
});

watch(toDate, (newVal) => {
    if (newVal) {
        if (newVal < minDate) {
            toDate.value = minDate;
        } else if (newVal > maxDate) {
            toDate.value = maxDate;
        }
    }
});

const fetchUsers = ({ page: p, itemsPerPage: ipp } = {}) => {
    loading.value = true;

    if (p) page.value = p;
    if (ipp) itemsPerPage.value = ipp;

    const params = {
        page: page.value,
        limit: itemsPerPage.value,
        search: search.value,
        status: selectedFilter.value,
        from_date: fromDate.value,
        to_date: toDate.value
    };

    api.get('/admin/users', { params })
        .then((response) => {
            if (response.data.status) {
                partners.value = response.data.data;

                // Handle pagination meta
                if (response.data.pagination) {
                    totalPages.value = response.data.pagination.total_pages;
                    totalRecords.value = response.data.pagination.total_records;
                } else {
                    // Fallback
                    totalPages.value = 1;
                }
            }
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        })
        .finally(() => {
            loading.value = false;
        });
};

onMounted(() => {
    fetchUsers();
});

const viewPartner = (partner) => {
    router.push({ name: 'PartnerDetails', params: { id: partner.uuid } });
};



const getAvatarColor = (name) => {
    const colors = [
        'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'
    ];
    if (!name) return 'primary';
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

</script>

<style scoped>
.bg-grey-lighten-5 {
    background-color: #F9FAFB !important;
}

.bg-purple-lighten-5 {
    background-color: #F3F0FF !important;
}

.bg-green-lighten-5 {
    background-color: #ECFDF3 !important;
}

.bg-orange-lighten-5 {
    background-color: #FFFAEB !important;
}

.bg-red-lighten-5 {
    background-color: #FEF2F2 !important;
}

.text-secondary-color {
    color: var(--primary-color) !important;
}

.gap-4 {
    gap: 16px;
}

.gap-2 {
    gap: 8px;
}

.gap-1 {
    gap: 4px;
}

.filter-item {
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-item:hover {
    background-color: #F9FAFB;
}

.admin-table :deep(th) {
    font-size: 13px !important;
    text-transform: none !important;
    letter-spacing: normal !important;
    border-bottom: 1px solid #EAECF0 !important;
    color: black !important;
    font-weight: bold !important;
}

.admin-table :deep(td) {
    border-bottom: 1px solid #EAECF0 !important;
}

.hover-row:hover {
    background-color: #F9FAFB;
}

.date-input :deep(.v-field__input) {
    min-height: 48px;
    padding-top: 0;
    padding-bottom: 0;
}

.date-input :deep(.v-field__input):deep(.v-field--variant-outlined.v-field--density-compact) {
    min-height: 40px;
}

:deep(.v-field__outline) {
    --v-field-border-opacity: 0.15;
}

.card-padding {
    padding: 32px;
}

.table-responsive {
    overflow-x: auto;
}

.flex-wrap {
    flex-wrap: wrap;
}

.min-width-32 {
    min-width: 32px;
}

.min-width-40 {
    min-width: 40px;
}

.min-width-sm-40 {
    min-width: 40px;
}

@media (max-width: 600px) {
    .min-width-32 {
        min-width: 32px;
    }

    .min-width-sm-40 {
        min-width: 32px;
    }
}

.max-width-150 {
    max-width: 150px;
}
</style>