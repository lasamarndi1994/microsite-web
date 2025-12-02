<template>
    <v-app>
        <!-- Header -->
        <v-app-bar flat color="white" class="border-b">
            <v-container class="d-flex align-center py-0">
                <v-btn class="btn-secondary text-white text-capitalize font-weight-bold px-4" variant="flat"
                    rounded="lg">
                    Fincommunity
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn variant="text" class="text-capitalize">
                    Microsite platform <v-icon end>mdi-chevron-down</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-avatar color="grey-lighten-3" size="40">
                    <v-icon icon="mdi-account" color="grey"></v-icon>
                </v-avatar>
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-5">
            <v-container class="py-8">
                <v-card flat class="pa-6 rounded-xl" min-height="80vh">

                    <!-- Welcome Section -->
                    <div class="d-flex justify-space-between align-center mb-8">
                        <h1 class="text-h4 font-weight-bold text-grey-darken-3">Welcome Back</h1>
                        <div class="d-flex gap-4">
                            <v-btn variant="outlined" class="text-secondary-color text-capitalize mr-3"
                                style="border-color: var(--secondary-color);" prepend-icon="mdi-file-document-outline"
                                height="44">
                                Drafts
                            </v-btn>
                            <v-btn class="btn-secondary text-white text-capitalize" prepend-icon="mdi-plus" height="44"
                                flat to="/create-microsite">
                                Create new microsite
                            </v-btn>
                        </div>
                    </div>

                    <!-- Tabs -->
                    <div class="bg-grey-lighten-4 rounded-lg pa-1 d-inline-flex mb-6 w-100">
                        <v-btn variant="text" class="text-capitalize px-6 text-grey-darken-1" rounded="lg" height="44"
                            width="150">
                            My Microsites
                        </v-btn>
                        <v-btn class="btn-secondary text-white text-capitalize px-6" variant="flat" rounded="lg"
                            height="44" width="200">
                            Pending Microsites
                        </v-btn>
                    </div>

                    <!-- Search and Filter -->
                    <div class="d-flex mb-6 gap-4">
                        <v-text-field density="compact" variant="outlined" label="Search"
                            prepend-inner-icon="mdi-magnify" hide-details single-line
                            class="bg-white rounded-lg"></v-text-field>
                        <v-btn variant="outlined" class="text-capitalize ml-4 text-grey-darken-2"
                            prepend-icon="mdi-filter-variant" height="44" color="grey-lighten-1">
                            Filters
                        </v-btn>
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
                                        <v-btn icon="mdi-delete-outline" variant="text" color="grey"
                                            size="small"></v-btn>
                                        <v-btn v-if="item.status !== 'Pending'" icon="mdi-pencil-outline" variant="text"
                                            color="grey" size="small"></v-btn>
                                        <v-btn v-if="item.status !== 'Pending'" icon="mdi-eye-outline" variant="text"
                                            color="grey" size="small"></v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>

                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue';

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

<style scoped>
/* Custom styles if needed to tweak Vuetify defaults */
</style>
