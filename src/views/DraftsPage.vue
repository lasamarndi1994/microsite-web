<template>
    <v-app>
        <AppBar />
        <v-main class="bg-grey-lighten-5">
            <v-container class="py-8">
                <v-card flat class="card-padding rounded-xl" min-height="80vh">
                    <!-- Welcome Section -->
                    <v-row class="mb-8" align="center">
                        <v-col cols="12" lg="6">
                            <h2 class="fs-18 font-weight-bold mb-4">
                                <v-icon icon="mdi-arrow-left" class="mr-2" color="grey-darken-1"></v-icon>
                                Drafts
                            </h2>
                        </v-col>
                        <v-col cols="12" lg="6" class="d-flex justify-end">
                            <v-btn class="btn-secondary text-white text-capitalize" height="44" flat
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

                    <div>
                        <div class="d-flex justify-content-between mb-6 gap-4">
                            <v-text-field density="compact" variant="outlined" label="Search"
                                prepend-inner-icon="mdi-magnify" hide-details single-line
                                class="bg-white rounded-lg search-input" max-width="500px"></v-text-field>
                        </div>

                        <!-- Microsites List -->
                        <v-card flat border class="rounded-lg">
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left text-caption text-grey">Microsites</th>
                                        <th class="text-left text-caption text-grey">Status</th>
                                        <th class="text-left text-caption text-grey">Last Update</th>
                                        <th class="text-right text-caption text-grey"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in microsites" :key="item.title">
                                        <td class="py-4">
                                            <div class="d-flex align-center">
                                                <v-avatar color="blue-lighten-5" rounded="lg" size="40" class="mr-4">
                                                    <v-icon :color="item.iconColor" :icon="item.icon"></v-icon>
                                                </v-avatar>
                                                <div>
                                                    <div class="text-subtitle-2 font-weight-bold">{{ item.title }}</div>
                                                    <div class="text-caption text-grey">{{ item.subtitle }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <v-chip :color="item.statusColor" size="small" variant="flat" class="px-2">
                                                <span class="text-capitalize">{{ item.status }}</span>
                                            </v-chip>
                                        </td>
                                        <td class="text-body-2 text-grey-darken-1">{{ item.date }}</td>
                                        <td class="text-right">
                                            <v-btn icon="mdi-delete-outline" variant="text" color="grey" size="large"
                                                @click="confirmDelete(item)"></v-btn>
                                            <v-btn v-if="item.status !== 'Pending'" icon="mdi-pencil-outline"
                                                variant="text" color="grey" size="large"></v-btn>
                                            <v-btn v-if="item.status !== 'Pending'" icon="mdi-eye-outline"
                                                variant="text" color="grey" size="large"
                                                @click="openPreview(item)"></v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card>

                        <!-- Preview Dialog -->
                        <v-dialog v-model="showPreview" max-width="600">
                            <v-card class="rounded-xl pa-6">
                                <div class="d-flex justify-space-between align-center mb-6">
                                    <h3 class="text-h6 font-weight-bold">
                                    {{ selectedMicrosite?.status === 'Rejected' ? 'Rejection Details' : 'Microsite Details' }}</h3>
                                    <v-btn icon="mdi-close" variant="text" density="compact"
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
                                            :class="selectedMicrosite.status === 'Rejected' ? 'text-red' : 'text-green'">
                                            {{
                                                selectedMicrosite.status }}</div>
                                    </v-col>
                                    <v-col cols="4">
                                        <div class="text-caption text-grey mb-1">Last Updated</div>
                                        <div class="font-weight-bold">{{ selectedMicrosite.date }}</div>
                                    </v-col>
                                </v-row>

                                <div v-if="selectedMicrosite?.rejectionReason" class="mb-6">
                                    <div class="text-caption text-grey mb-2">Reason from Admin</div>
                                    <div class="bg-grey-lighten-5 pa-4 rounded-lg border text-body-2">
                                        {{ selectedMicrosite.rejectionReason }}
                                    </div>
                                </div>

                                <VueButton title="Close" classStyle="w-100" @click="showPreview = false" />
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="showDeleteConfirm" max-width="500">
                            <v-card class="rounded-xl pa-6">
                                <h3 class="text-h6 font-weight-bold mb-4">Delete Microsite?</h3>
                                <p class="text-body-1 text-grey mb-6">
                                    Are you sure you want to delete <span class="font-weight-bold text-black">{{
                                        itemToDelete?.title
                                    }}</span>?
                                    This action cannot be undone.
                                </p>

                                <div class="d-flex gap-4">
                                    <v-btn variant="outlined" class="flex-grow-1 text-capitalize" height="44"
                                        @click="showDeleteConfirm = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="red" class="flex-grow-1 text-white text-capitalize" flat height="44"
                                        @click="deleteItem">
                                        Delete
                                    </v-btn>
                                </div>
                            </v-card>
                        </v-dialog>
                    </div>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import AppBar from '@/components/AppBar.vue';

const router = useRouter();
const showPreview = ref(false);
const selectedMicrosite = ref(null);
const showDeleteConfirm = ref(false);
const itemToDelete = ref(null);

const openPreview = (item) => {
    selectedMicrosite.value = item;
    showPreview.value = true;
};

const confirmDelete = (item) => {
    itemToDelete.value = item;
    showDeleteConfirm.value = true;
};

const deleteItem = () => {
    if (itemToDelete.value) {
        microsites.value = microsites.value.filter(m => m !== itemToDelete.value);
        showDeleteConfirm.value = false;
        itemToDelete.value = null;
    }
};

const microsites = ref([
    {
        title: 'Product Launch',
        subtitle: 'Product Launch.io',
        icon: 'mdi-rocket-launch-outline',
        iconColor: 'blue',
        status: 'Pending',
        statusColor: 'orange-lighten-4 text-orange-darken-4', // Custom styling for chip
        date: '20 NOV 2025',
    },
    {
        title: 'Campaign Landing',
        subtitle: 'Campaign Landing.io',
        icon: 'mdi-bullhorn-outline',
        iconColor: 'orange',
        status: 'Rejected',
        statusColor: 'red-lighten-4 text-red-darken-4',
        date: '24 NOV 2025',
        rejectionReason: 'The banner image uploaded is low resolution and does not meet the required quality standards.',
    },
    {
        title: 'Campaign Landing',
        subtitle: 'Campaign Landing.io',
        icon: 'mdi-bullhorn-outline',
        iconColor: 'orange',
        status: 'Active',
        statusColor: 'green-lighten-4 text-green-darken-4',
        date: '24 NOV 2025',
    },
]);

const createMicrosite = () => {
    router.push("/create-microsite");
};
</script>

<style scoped>
/* Card Hover Transitions */
.v-card,
.card {
    transition: all 0.3s ease-in-out !important;
}

.v-card:hover,
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}
</style>
