<template>
    <div>
        <v-row class="mb-6" align="center">
            <v-col>
                <v-text-field density="compact" variant="outlined" label="Search" prepend-inner-icon="mdi-magnify"
                    hide-details single-line class="bg-white rounded-lg search-input" max-width="450px"></v-text-field>
            </v-col>
            <v-col cols="auto">
                <v-btn variant="outlined" class="text-capitalize text-grey-darken-2" prepend-icon="mdi-filter-variant"
                    height="44" color="grey-lighten-1">
                    Filters
                </v-btn>
            </v-col>
        </v-row>

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
                            <v-btn v-if="item.status !== 'Pending'" icon="mdi-pencil-outline" variant="text"
                                color="grey" size="large"></v-btn>
                            <v-btn v-if="item.status !== 'Pending'" icon="mdi-eye-outline" variant="text" color="grey"
                                size="large" @click="openPreview(item)"></v-btn>
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
                    <v-btn icon="mdi-close" variant="text" density="compact" @click="showPreview = false"></v-btn>
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
                    Are you sure you want to delete <span class="font-weight-bold text-black">{{ itemToDelete?.title
                    }}</span>?
                    This action cannot be undone.
                </p>

                <v-row class="gx-2">
                    <v-col cols="6">
                        <v-btn variant="outlined" class="w-100 text-capitalize" height="44"
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
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
</script>

<style scoped></style>
