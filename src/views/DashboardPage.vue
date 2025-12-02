<template>
     
    <v-app>
        <AppBar />
        <v-main class="bg-grey-lighten-5">
            <v-container class="py-8">
                <v-card flat class="card-padding rounded-xl" min-height="80vh">

                    <!-- Welcome Section -->
                    <v-row class="mb-8" align="center">
                        <v-col cols="12" lg="6">
                            <h1 class="fs-24 font-weight-bold text-grey-darken-3">Welcome Back</h1>
                        </v-col>
                        <v-col cols="12" lg="6" class="d-flex justify-end">
                            <v-row justify="start" justify-lg="end">
                                <v-col cols="12" sm="6" lg="auto">
                                    <v-btn variant="outlined" class="text-secondary-color text-capitalize w-100"
                                        style="border-color: var(--secondary-color);" prepend-icon="mdi-file-document-outline"
                                        height="44">
                                        Drafts
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" sm="6" lg="auto">
                                    <v-btn class="btn-secondary text-white text-capitalize w-100" height="44"
                                        flat @click="createMicrosite">
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
                        </v-col>
                    </v-row>

                    <!-- Analytics Section -->
                    <h2 class="fs-18 font-weight-bold mb-4">Analytics</h2>
                    <v-row class="mb-8">
                        <v-col cols="12" md="4">
                            <v-card flat border class="pa-4 rounded-lg">
                                <div class="d-flex align-center">
                                    <v-avatar color="deep-purple-lighten-5" rounded="lg" size="48" class="mr-4">
                                        <img src="@/assets/images/Frame 12.svg" alt="Visitors" width="44" height="44" />
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
                            <v-card flat border class="pa-4 rounded-lg">
                                <div class="d-flex align-center">
                                    <v-avatar color="deep-purple-lighten-5" rounded="lg" size="48" class="mr-4">
                                        <img src="@/assets/images/Frame 54.svg" alt="Engagement" width="44" height="44" />
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
                            <v-card flat border class="pa-4 rounded-lg">
                                <div class="d-flex align-center">
                                    <v-avatar color="deep-purple-lighten-5" rounded="lg" size="48" class="mr-4">
                                        <img src="@/assets/images/Frame 54 (1).svg" alt="Conversions" width="44" height="44" />
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

                    <!-- Tabs -->
                    <v-tabs v-model="activeTab" class="mb-6 custom-tabs" bg-color="grey-lighten-4" rounded="50" height="60">
                        <v-tab value="my-microsites" class="text-capitalize px-10 custom-tab">
                            My Microsites
                        </v-tab>
                        <v-tab value="pending-microsites" class="text-capitalize px-10 custom-tab">
                            Pending Microsites
                        </v-tab>
                    </v-tabs>

                    <!-- Microsites Grid -->
                    <v-row>
                        <!-- Product Launch Card -->
                        <v-col cols="12">
                            <v-card flat border class="rounded-lg overflow-hidden">
                                <v-row no-gutters>
                                    <v-col cols="12" md="3">
                                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="100%"
                                            cover class="bg-grey-lighten-2">
                                            <!-- Placeholder for the specific image in design -->
                                            <div class="d-flex fill-height align-center justify-center text-grey">
                                                Image Placeholder
                                            </div>
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" md="9" class="pa-6">
                                        <h3 class="text-h6 font-weight-bold mb-2">Product Launch</h3>
                                        <p class="text-body-2 text-grey-darken-1 mb-0">
                                            Introduce your latest products with clarity and impact. This section
                                            highlights key features, value propositions, and benefits to ensure your
                                            audience understands the importance and uniqueness of the new offering.
                                        </p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>

                        <!-- Event Hub Card -->
                        <v-col cols="12">
                            <v-card flat border class="rounded-lg overflow-hidden">
                                <v-row no-gutters>
                                    <v-col cols="12" md="9" class="pa-6 order-last order-md-first">
                                        <h3 class="text-h6 font-weight-bold mb-2">Event Hub</h3>
                                        <p class="text-body-2 text-grey-darken-1 mb-0">
                                            A centralized space to explore, manage, and engage with all events. From
                                            upcoming sessions to past highlights, this hub provides users with easy
                                            access to event details, registrations, and real-time updates.
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="3" class="order-first order-md-last">
                                        <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" height="100%"
                                            cover class="bg-deep-purple-lighten-4">
                                            <!-- Placeholder for the specific image in design -->
                                            <div class="d-flex fill-height align-center justify-center text-white">
                                                Image Placeholder
                                            </div>
                                        </v-img>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>

                        <!-- Portfolio Card -->
                        <v-col cols="12" md="6">
                            <v-card flat border class="rounded-lg overflow-hidden h-100">
                                <v-row no-gutters class="h-100">
                                    <v-col cols="12" sm="5">
                                        <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" height="100%"
                                            cover class="bg-grey-lighten-2">
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" sm="7" class="pa-4">
                                        <h3 class="text-subtitle-1 font-weight-bold mb-2">Portfolio</h3>
                                        <p class="text-caption text-grey-darken-1 mb-0">
                                            Showcase and track the complete range of your assets in one place. This
                                            section provides clear insights, performance analytics, and organized
                                            summaries to help users understand and manage their portfolio effectively.
                                        </p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>

                        <!-- Campaign Landing Card -->
                        <v-col cols="12" md="6">
                            <v-card flat border class="rounded-lg overflow-hidden h-100">
                                <v-row no-gutters class="h-100">
                                    <v-col cols="12" sm="5">
                                        <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" height="100%"
                                            cover class="bg-deep-purple-lighten-4">
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" sm="7" class="pa-4">
                                        <h3 class="text-subtitle-1 font-weight-bold mb-2">Campaign Landing</h3>
                                        <p class="text-caption text-grey-darken-1 mb-0">
                                            Drive focused engagement through tailored campaign pages. Present key
                                            messaging, calls to action, and targeted content that guide users toward
                                            meaningful interactions and campaign goals.
                                        </p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>

                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import AppBar from '@/components/AppBar.vue'

const router = useRouter();
const activeTab = ref('my-microsites')

const createMicrosite = () => {
  router.push("/create-microsite");
  
};
</script>

<style scoped>
.custom-tabs {
    border-radius: 20px !important;
    padding: 4px;
}

.custom-tabs :deep(.v-tab--selected) {
    background-color: #7f56da;
    color: #fcf9f9;
    border-radius: 20px;
    box-shadow: 0 2px 4px #0000001a;
    padding: 8px 16px;
}

.custom-tabs :deep(.v-tab) {
    margin: 0px;
}

.custom-tab {
    transition: all 0.2s ease;
}
</style>
