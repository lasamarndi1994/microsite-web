<template>
    <v-app>
        <AppBar />
        <v-main class="bg-grey-lighten-5">
            <v-container class="py-8">
                <v-card flat class="card-padding rounded-xl" min-height="80vh">
                    <!-- Welcome Section -->
                    <v-row class="mb-4" align="center">
                        <v-col cols="12" lg="8">
                            <h1 class="fs-24 font-weight-bold text-grey-darken-3">Welcome Back</h1>
                        </v-col>
                        <v-col cols="12" lg="4" class="d-none d-lg-flex justify-end">
                            <v-btn variant="outlined" style="border-color: #7f56da; color: #7f56da" class="text-capitalize mr-4" height="44"
                                @click="DraftMicrosite" max-width="200px">
                                <template v-slot:prepend>
                                        <v-icon size="16">mdi-file-document-outline</v-icon>
                                </template>
                                Drafts
                            </v-btn>
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

                    <v-row class="mb-4 d-lg-none">
                        <v-col cols="12" sm="6">
                            <v-btn variant="outlined" style="border-color: #7f56da; color: #7f56da" class="text-capitalize w-100" height="44"
                                @click="DraftMicrosite">
                                <template v-slot:prepend>
                                        <v-icon size="16">mdi-file-document-outline</v-icon>
                                </template>
                                Drafts
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-btn class="btn-secondary text-white text-capitalize w-100" height="44" flat
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
                                        <img src="@/assets/images/Frame54.svg" alt="Engagement" width="44"
                                            height="44" />
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
                                        <img src="@/assets/images/Frame54(1).svg" alt="Conversions" width="44"
                                            height="44" />
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
                                <v-btn variant="text" class="text-capitalize px-md-6 px-4 text-body-2 text-sm-body-1" rounded="lg" height="44" width="150"
                                    :class="activeTab === 'my-microsites' ? 'btn-secondary text-white' : 'text-grey-darken-1'"
                                    @click="activeTab = 'my-microsites'">
                                    My Microsites
                                </v-btn>
                            </v-col>
                            <v-col cols="6" sm="auto">
                                <v-btn class="text-capitalize px-md-6 px-4 text-body-2 text-sm-body-1 ms-3" variant="flat" rounded="lg" height="44" width="200"
                                    :class="activeTab === 'pending' ? 'btn-secondary text-white' : ''"
                                    @click="activeTab = 'pending'">
                                    Pending Microsites
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- Microsites Grid -->
                    <v-row v-if="activeTab === 'my-microsites'">
                        <!-- Product Launch Card -->
                        <v-col cols="12" md="4">
                            <v-card flat border class="rounded-lg overflow-hidden microsite-card" height="100%">
                                <v-img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
                                    height="200" cover class="bg-grey-lighten-2">

                                </v-img>
                                <v-card-text class="pa-4">
                                    <div class="d-flex align-center justify-space-between">
                                        <h3 class="fs-22 font-weight-bold">Product Launch</h3>
                                        <v-icon class="font-weight-bold">mdi-arrow-top-right</v-icon>
                                    </div>
                                    <p class="text-caption text-grey-darken-1 mt-2 mb-0 fs-14 font-weight-medium">
                                        Introduce your latest products with clarity and impact. This section highlights
                                        key features, value
                                        propositions, and benefits to ensure your audience understands the importance
                                        and uniqueness of the
                                        new offering.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <!-- Event Hub Card -->
                        <v-col cols="12" md="4">
                            <v-card flat border class="rounded-lg overflow-hidden microsite-card" height="100%">
                                <v-img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500"
                                    height="200" cover class="bg-deep-purple-lighten-4">

                                </v-img>
                                <v-card-text class="pa-4">
                                    <div class="d-flex align-center justify-space-between">
                                        <h3 class="fs-22 font-weight-bold">Event Hub</h3>
                                        <v-icon>mdi-arrow-top-right</v-icon>
                                    </div>
                                    <p class="text-caption text-grey-darken-1 mt-2 mb-0 fs-14 font-weight-medium">
                                        A centralized space to explore, manage, and engage with all events. From
                                        upcoming sessions to past
                                        highlights, this hub provides users with easy access to event details,
                                        registrations, and real-time
                                        updates.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <!-- Portfolio Card -->
                        <v-col cols="12" md="4">
                            <v-card flat border class="rounded-lg overflow-hidden microsite-card" height="100%">
                                <v-img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500"
                                    height="200" cover class="bg-grey-lighten-2">

                                </v-img>
                                <v-card-text class="pa-4">
                                    <div class="d-flex align-center justify-space-between">
                                        <h3 class="fs-22 font-weight-bold">Portfolio</h3>
                                        <v-icon>mdi-arrow-top-right</v-icon>
                                    </div>
                                    <p class="text-caption text-grey-darken-1 mt-2 mb-0 fs-14 font-weight-medium">
                                        Showcase and track the complete range of your assets in one place. This section
                                        provides clear
                                        insights, performance analytics, and organized summaries to help users
                                        understand and manage their
                                        portfolio effectively.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <!-- Second Row -->
                        <!-- Headline Card -->
                        <v-col cols="12" md="4">
                            <v-card flat border class="rounded-lg overflow-hidden microsite-card" height="100%">
                                <v-img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500"
                                    height="200" cover class="bg-purple-lighten-4">

                                </v-img>
                                <v-card-text class="pa-4">
                                    <div class="d-flex align-center justify-space-between">
                                        <h3 class="fs-22 font-weight-bold">Campaign Landing</h3>
                                        <v-icon>mdi-arrow-top-right</v-icon>
                                    </div>
                                    <p class="text-caption text-grey-darken-1 mt-2 mb-0 fs-14 font-weight-medium">
                                        Drive focused engagement through tailored campaign pages. Present key messaging,
                                        calls to action,
                                        and targeted content that guide users toward meaningful interactions and
                                        campaign goals.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <!-- Creative Journey Card -->
                        <v-col cols="12" md="4">
                            <v-card flat border class="rounded-lg overflow-hidden microsite-card" height="100%">
                                <v-img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500"
                                    height="200" cover class="bg-grey-lighten-2">
                                    <div class="card-overlay pa-6 d-flex align-center justify-center">
                                        <div>
                                            <h3 class="text-h6 font-weight-bold text-grey-darken-3 text-center mb-4">
                                                CREATIVE<br />JOURNEY
                                            </h3>
                                            <div class="d-flex justify-center gap-2">
                                                <v-btn icon size="small" variant="tonal" color="grey-darken-3">
                                                    <v-icon>mdi-chevron-left</v-icon>
                                                </v-btn>
                                                <v-btn icon size="small" variant="tonal" color="grey-darken-3">
                                                    <v-icon>mdi-chevron-right</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>
                                </v-img>
                                <v-card-text class="pa-4">
                                    <div class="d-flex align-center justify-space-between">
                                        <h3 class="fs-22 font-weight-bold">Portfolio Showcase</h3>
                                        <v-icon>mdi-arrow-top-right</v-icon>
                                    </div>
                                    <p class="text-caption text-grey-darken-1 mt-2 mb-0 fs-14 font-weight-medium">
                                        Interactive portfolio display with navigation controls. Showcase your creative
                                        work with an engaging
                                        carousel interface that highlights your best projects.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <!-- Event Series Card -->
                        <v-col cols="12" md="4">
                            <v-card flat border class="rounded-lg overflow-hidden microsite-card" height="100%">
                                <v-img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500"
                                    height="200" cover class="bg-deep-purple-lighten-4">
                                    <div class="card-overlay pa-6">
                                        <h3 class="text-h6 font-weight-bold text-grey-darken-3 mb-2">Innovate &
                                            Connect:<br />Event Series
                                        </h3>
                                        <v-btn size="small" variant="tonal" color="deep-purple"
                                            class="text-capitalize mt-2">
                                            Explore Events
                                        </v-btn>
                                    </div>
                                </v-img>
                                <v-card-text class="pa-4">
                                    <div class="d-flex align-center justify-space-between">
                                        <h3 class="fs-22 font-weight-bold">Event Management</h3>
                                        <v-icon>mdi-arrow-top-right</v-icon>
                                    </div>
                                    <p class="text-caption text-grey-darken-1 mt-2 mb-0 fs-14 font-weight-medium">
                                        Comprehensive event management platform. Organize, promote, and track your
                                        events with powerful
                                        tools designed for seamless event coordination and attendee engagement.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <PendingMicrosite v-else />
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import AppBar from '@/components/AppBar.vue';
import PendingMicrosite from "@/views/MicrositeListPage.vue";


const router = useRouter();
const activeTab = ref('my-microsites');
const selectedFilter = ref(null);
const selectedFilterLabel = ref(null);

const createMicrosite = () => {
    router.push("/create-microsite");
};

const DraftMicrosite = () => {
    router.push("/drafts-microsite");
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
    border-color: #7f56da !important;
}


</style>
