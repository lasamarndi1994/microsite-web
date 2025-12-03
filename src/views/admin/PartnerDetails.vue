<template>
  <v-app>
    <AppBar />
    <v-main class="bg-grey-lighten-5">
      <v-container class="py-8">
        <v-card flat class="card-padding rounded-xl" min-height="80vh">
          <!-- Header Section -->
          <div class="mb-8">
            <div class="d-flex align-center justify-space-between mb-1">
              <div>
                <h1 class="fs-24 font-weight-bold text-grey-darken-3 mb-1">Partner Details</h1>
                <p class="text-subtitle-1 text-grey-darken-1">
                  Essential partner information and microsite submissions
                </p>
              </div>
              <v-btn 
                variant="text" 
                icon="mdi-arrow-left" 
                color="grey-darken-2"
                @click="goBack"
              ></v-btn>
            </div>
          </div>

          <!-- Partner Info Card -->
          <v-card flat class="bg-purple-lighten-5 mb-8 rounded-lg pa-6">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <v-avatar size="80" class="mr-6">
                  <v-img :src="partnerInfo.avatar" cover></v-img>
                </v-avatar>
                <div>
                  <div class="text-h5 font-weight-bold text-grey-darken-3 mb-1">{{ partnerInfo.name }}</div>
                  <div class="text-body-1 text-grey-darken-2 mb-2">{{ partnerInfo.company }}</div>
                  <div class="d-flex align-center gap-4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-email-outline" size="18" class="mr-2 text-grey-darken-1"></v-icon>
                      <span class="text-body-2 text-grey-darken-2">{{ partnerInfo.email }}</span>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-phone-outline" size="18" class="mr-2 text-grey-darken-1"></v-icon>
                      <span class="text-body-2 text-grey-darken-2">{{ partnerInfo.mobile }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <v-chip 
                :color="getStatusColor(partnerInfo.status)" 
                size="default" 
                variant="flat" 
                class="px-4"
              >
                <span class="text-capitalize font-weight-medium">{{ partnerInfo.status }}</span>
              </v-chip>
            </div>
          </v-card>

          <!-- Stats Cards -->
          <!-- <v-row class="mb-8">
            <v-col cols="12" md="4">
              <v-card flat border class="pa-4 rounded-lg">
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Total Microsites</div>
                    <div class="text-h5 font-weight-bold text-grey-darken-3">{{ stats.totalMicrosites }}</div>
                  </div>
                  <v-avatar color="blue-lighten-5" size="48" rounded="lg">
                    <v-icon icon="mdi-web" color="blue" size="24"></v-icon>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card flat border class="pa-4 rounded-lg">
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Pending Review</div>
                    <div class="text-h5 font-weight-bold text-grey-darken-3">{{ stats.pendingReview }}</div>
                  </div>
                  <v-avatar color="orange-lighten-5" size="48" rounded="lg">
                    <v-icon icon="mdi-clock-outline" color="orange" size="24"></v-icon>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card flat border class="pa-4 rounded-lg">
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Approved</div>
                    <div class="text-h5 font-weight-bold text-grey-darken-3">{{ stats.approved }}</div>
                  </div>
                  <v-avatar color="green-lighten-5" size="48" rounded="lg">
                    <v-icon icon="mdi-check-circle" color="green" size="24"></v-icon>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row> -->

          <!-- Filters Section -->
          <v-row class="mb-6" align="center">
            <v-col cols="12" md="6">
              <v-text-field 
                v-model="search" 
                placeholder="Search microsites" 
                prepend-inner-icon="mdi-magnify" 
                variant="outlined"
                density="comfortable" 
                hide-details 
                bg-color="white" 
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-end gap-4 align-center">
              <v-btn 
                variant="outlined" 
                prepend-icon="mdi-filter-variant" 
                class="text-capitalize" 
                height="48"
                color="grey-darken-3" style="border-color: #7f56da; color: #7f56da"
              >
                {{ selectedFilterLabel || 'Filters' }}
                <v-menu activator="parent">
                  <v-list class="py-3 px-2" min-width="220">
                    <v-list-item 
                      v-for="(filter, index) in filterOptions" 
                      :key="index" 
                      :value="filter.value"
                      class="mb-2 filter-item rounded-lg"
                      @click="selectFilter(filter.value)"
                    >
                      <template v-slot:default>
                        <div class="d-flex align-center justify-space-between w-100">
                          <v-chip 
                            :color="filter.color" 
                            size="small" 
                            variant="flat" 
                            class="px-3"
                          >
                            <v-icon :icon="filter.icon" size="16" class="mr-1"></v-icon>
                            <span class="text-capitalize font-weight-medium">{{ filter.label }}</span>
                          </v-chip>
                          <v-icon 
                            v-if="selectedFilter === filter.value" 
                            icon="mdi-check-circle" 
                            color="success" 
                            size="20"
                          ></v-icon>
                        </div>
                      </template>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item class="filter-item rounded-lg" @click="clearFilter">
                      <template v-slot:default>
                        <div class="d-flex align-center">
                          <v-icon icon="mdi-close-circle-outline" size="18" class="mr-2 text-grey"></v-icon>
                          <span class="text-body-2 text-grey-darken-2">Clear Filter</span>
                        </div>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
          </v-row>

          <!-- Microsites Table -->
          <v-card flat border class="rounded-lg">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left text-caption text-grey">Microsite</th>
                  <th class="text-left text-caption text-grey">Last Update</th>
                  <th class="text-left text-caption text-grey">Status</th>
                  <th class="text-right text-caption text-grey">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in microsites" :key="index">
                  <td class="py-4">
                    <div class="d-flex align-center">
                      <v-avatar :color="item.iconBg" rounded="lg" size="40" class="mr-4">
                        <v-icon :color="item.iconColor" :icon="item.icon" size="20"></v-icon>
                      </v-avatar>
                      <div>
                        <div class="text-subtitle-2 font-weight-bold">{{ item.title }}</div>
                        <div class="text-caption text-grey">{{ item.subtitle }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-body-2 text-grey-darken-1">{{ item.lastUpdate }}</td>
                  <td>
                    <v-chip 
                      :color="getMicrositeStatusColor(item.status)" 
                      size="small" 
                      variant="flat" 
                      class="px-2"
                    >
                      <span class="text-capitalize">{{ item.status }}</span>
                    </v-chip>
                  </td>
                  <td class="text-right">
                    <v-btn
                      icon="mdi-eye-outline"
                      variant="text"
                      color="grey-darken-2"
                      class="mr-2"
                      size="large"
                        @click="reviewMicrosite(item)"
                    ></v-btn>
                    
                  </td>
                </tr>
              </tbody>
            </v-table>

            <!-- Pagination -->
            <div class="d-flex align-center justify-space-between px-6 py-4 border-t">
              <v-btn 
                variant="outlined" 
                color="grey-darken-1" 
                class="text-capitalize px-6"
                prepend-icon="mdi-arrow-left"
              >
                Previous
              </v-btn>

              <div class="d-flex align-center gap-2">
                <v-btn 
                  v-for="n in 3" 
                  :key="n" 
                  variant="text" 
                  :color="n === 1 ? 'secondary-color' : 'grey-darken-1'"
                  :class="{ 'bg-purple-lighten-5': n === 1 }" 
                  class="min-width-40 px-0" 
                  height="40" 
                  width="40"
                >
                  {{ n }}
                </v-btn>
              </div>

              <v-btn 
                variant="outlined" 
                color="grey-darken-1" 
                class="text-capitalize px-6"
                append-icon="mdi-arrow-right"
              >
                Next
              </v-btn>
            </div>
          </v-card>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppBar from '@/components/AppBar.vue';

const router = useRouter();
const route = useRoute();

const search = ref('');
const selectedFilter = ref(null);
const selectedFilterLabel = ref(null);

const filterOptions = ref([
  {
    label: 'Pending',
    value: 'pending',
    color: 'orange-lighten-4 text-orange-darken-4',
    icon: 'mdi-clock-outline'
  },
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
  }
]);

const partnerInfo = ref({
  name: 'Lasa Marndi',
  company: 'Mehta Creative Studio',
  email: 'Arjun.Mehta@example.com',
  mobile: '98765 43210',
  status: 'Action Required',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
});

const stats = ref({
  totalMicrosites: 12,
  pendingReview: 5,
  approved: 7
});

const microsites = ref([
  {
    title: 'Product Launch',
    subtitle: 'ProductLaunch.io',
    icon: 'mdi-rocket-launch-outline',
    iconColor: 'blue',
    iconBg: 'blue-lighten-5',
    lastUpdate: '20 NOV 2025',
    status: 'Pending'
  },
  {
    title: 'Campaign Landing',
    subtitle: 'CampaignLanding.io',
    icon: 'mdi-bullhorn-outline',
    iconColor: 'orange',
    iconBg: 'orange-lighten-5',
    lastUpdate: '24 NOV 2025',
    status: 'Pending'
  },
  {
    title: 'Event Registration',
    subtitle: 'EventReg.io',
    icon: 'mdi-calendar-outline',
    iconColor: 'green',
    iconBg: 'green-lighten-5',
    lastUpdate: '18 NOV 2025',
    status: 'Approved'
  },
  {
    title: 'Portfolio Showcase',
    subtitle: 'Portfolio.io',
    icon: 'mdi-briefcase-outline',
    iconColor: 'purple',
    iconBg: 'purple-lighten-5',
    lastUpdate: '15 NOV 2025',
    status: 'Approved'
  }
]);

const selectFilter = (value) => {
  selectedFilter.value = value;
  const filter = filterOptions.value.find(f => f.value === value);
  selectedFilterLabel.value = filter ? filter.label : null;
  // Add your filter logic here
  console.log('Filter selected:', value);
};

const clearFilter = () => {
  selectedFilter.value = null;
  selectedFilterLabel.value = null;
  console.log('Filter cleared');
};

const goBack = () => {
  router.push({ name: 'AdminDashboard' });
};

const reviewMicrosite = (microsite) => {
  router.push({ name: 'MicrositeReview', params: { id: microsite.id } });
};

const getStatusColor = (status) => {
  return status === 'Action Required' 
    ? 'orange-lighten-4 text-orange-darken-4' 
    : 'green-lighten-4 text-green-darken-4';
};

const getMicrositeStatusColor = (status) => {
  const colors = {
    'Pending': 'orange-lighten-4 text-orange-darken-4',
    'Approved': 'green-lighten-4 text-green-darken-4',
    'Rejected': 'red-lighten-4 text-red-darken-4'
  };
  return colors[status] || 'grey-lighten-4 text-grey-darken-4';
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
  color: var(--secondary-color) !important;
}

.gap-4 {
  gap: 16px;
}

.gap-2 {
  gap: 8px;
}

.filter-item {
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-item:hover {
  background-color: #F9FAFB;
}

:deep(th) {
  font-size: 13px !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  border-bottom: 1px solid #EAECF0 !important;
}

:deep(td) {
  border-bottom: 1px solid #EAECF0 !important;
}

:deep(.v-field__outline) {
  --v-field-border-opacity: 0.15;
}

.card-padding {
  padding: 32px;
}

.fs-24 {
  font-size: 24px;
}
</style>
