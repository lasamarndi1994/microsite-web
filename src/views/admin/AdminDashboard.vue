
<template>
<app-layout>
        <v-card flat class="card-padding rounded-xl" min-height="80vh">
          <!-- Header Section -->
          <v-row class="mb-6">
            <v-col cols="12">
              <div class="d-flex align-center mb-1 flex-wrap">
                  <h1 class="font-weight-bold text-grey-darken-3 mb-1" :class="$vuetify.display.smAndDown ? 'fs-20' : 'fs-24'">Admin Dashboard</h1>
               
                <v-chip class="ml-4 custom-chip bg-purple-lighten-5 text-secondary-color" label size="small">
                  <span class="font-weight-bold">240 Partner</span>
                </v-chip>
              </div>
              <p class="text-grey-darken-1" :class="$vuetify.display.smAndDown ? 'text-subtitle-2' : 'text-subtitle-1'">
                Manage and review microsite submissions efficiently
              </p>
            </v-col>
          </v-row>

          <!-- Filters Section -->
          <v-row class="mb-6">
            <v-col cols="12" md="3">
              <v-text-field v-model="search" placeholder="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                density="comfortable" hide-details bg-color="white" class="rounded-lg"></v-text-field>
            </v-col>
            <v-col cols="12" md="9">
              <v-row align="center" class="flex-wrap">

                <v-col cols="12" sm="9" class="d-flex justify-end">
                  <div class="d-flex align-center">
                    <v-text-field type="date" variant="outlined" density="comfortable" hide-details bg-color="white"
                      class="date-input" placeholder="DD/MM/YYYY"></v-text-field>
                    <span class="text-grey-darken-1 mx-2">to</span>
                    <v-text-field type="date" variant="outlined" density="comfortable" hide-details bg-color="white"
                      class="date-input" placeholder="DD/MM/YYYY"></v-text-field>
                  </div>
                </v-col>
                
                <v-col cols="12" sm="3" class="d-flex justify-end">
                  <v-btn variant="outlined" prepend-icon="mdi-filter-variant" class="text-capitalize" height="48"
                    color="grey-darken-3" style="border-color: #7f56da; color: #7f56da">
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
                              <v-icon v-if="selectedFilter === filter.value" icon="mdi-check-circle" color="success"
                                size="20"></v-icon>
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
            </v-col>
          </v-row>

          <!-- Table Section -->
          <v-card flat border class="rounded-lg">
            <div class="table-responsive">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left text-caption text-grey">Partner</th>
                    <th class="text-left text-caption text-grey">Mobile no</th>
                    <th class="text-left text-caption text-grey">Last update</th>
                    <th class="text-left text-caption text-grey">Status</th>
                    <th class="text-right text-caption text-grey"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in partners" :key="index">
                    <td class="py-4">
                      <div class="d-flex align-center">
                        <v-avatar size="40" class="mr-4">
                          <v-img :src="item.avatar" cover></v-img>
                        </v-avatar>
                        <div>
                          <div class="text-subtitle-2 font-weight-bold">{{ item.name }}</div>
                          <div class="text-caption text-grey">{{ item.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="text-body-2 text-grey-darken-1">{{ item.mobile }}</td>
                    <td class="text-body-2 text-grey-darken-1">{{ item.lastUpdate }}</td>
                    <td>
                      <v-chip :color="getStatusColor(item.status)" size="small" variant="flat" class="px-2">
                        <span class="text-capitalize">{{ item.status }}</span>
                      </v-chip>
                    </td>
                    <td class="text-right">
                      <v-btn variant="text" color="grey" size="large"
                        @click="viewPartner(item)" class="fs-14 fw-500 text-secondary-color text-decoration-underline" style="text-transform: none;">View</v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>

            <!-- Pagination -->
            <v-row class="px-6 py-4 border-t" align="center">
              <v-col cols="12" xs="4" sm="4" class="d-flex justify-start">
                <v-btn variant="outlined" color="grey-darken-1" class="text-capitalize px-4 px-sm-6"
                  prepend-icon="mdi-arrow-left" size="small" :size="$vuetify.display.xs ? 'small' : 'default'">
                  Previous
                </v-btn>
              </v-col>
              <v-col cols="12" xs="4" sm="4" class="d-flex justify-center">
                <div class="d-flex align-center gap-1 gap-sm-2 flex-wrap">
                  <v-btn v-for="n in 3" :key="n" variant="text" :color="n === 1 ? 'secondary-color' : 'grey-darken-1'"
                    :class="{ 'bg-purple-lighten-5': n === 1 }" class="min-width-32 min-width-sm-40 px-0" :height="$vuetify.display.xs ? 32 : 40" :width="$vuetify.display.xs ? 32 : 40">
                    {{ n }}
                  </v-btn>
                  <span class="text-grey-darken-1 mx-1 mx-sm-2">...</span>
                  <v-btn v-for="n in [8, 9, 10]" :key="n" variant="text" color="grey-darken-1" class="min-width-32 min-width-sm-40 px-0"
                    :height="$vuetify.display.xs ? 32 : 40" :width="$vuetify.display.xs ? 32 : 40">
                    {{ n }}
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" xs="4" sm="4" class="d-flex justify-end">
                <v-btn variant="outlined" color="grey-darken-1" class="text-capitalize px-4 px-sm-6"
                  append-icon="mdi-arrow-right" size="small" :size="$vuetify.display.xs ? 'small' : 'default'">
                  Next
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
     </app-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const search = ref('');
const selectedFilter = ref(null);
const selectedFilterLabel = ref(null);

const filterOptions = ref([
  {
    label: 'Active',
    value: 'active',
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

const partners = ref([
  {
    name: 'Lasa Marndi',
    email: 'Arjun.Mehta@example.com',
    mobile: '98765 43210',
    lastUpdate: '20 NOV 2025',
    status: 'Action Required',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    name: 'Nisha Reddy',
    email: 'nisha.reddy@example.com',
    mobile: '90908 77654',
    lastUpdate: '20 NOV 2025',
    status: 'Action Required',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    name: 'Rohan Iyer',
    email: 'rohan.iyer@example.com',
    mobile: '98123 55678',
    lastUpdate: '20 NOV 2025',
    status: 'Action Required',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    name: 'Priya Malhotra',
    email: 'priya.malhotra@example.com',
    mobile: '91234 66778',
    lastUpdate: '18 NOV 2025',
    status: 'Accepted',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    name: 'Kunal Verma',
    email: 'kunal.verma@example.com',
    mobile: '98989 44321',
    lastUpdate: '17 NOV 2025',
    status: 'Accepted',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
]);

const selectFilter = (value) => {
  selectedFilter.value = value;
  const filter = filterOptions.value.find(f => f.value === value);
  selectedFilterLabel.value = filter ? filter.label : null;
  console.log('Filter selected:', value);
};

const clearFilter = () => {
  selectedFilter.value = null;
  selectedFilterLabel.value = null;
  console.log('Filter cleared');
};

const viewPartner = (partner) => {
  router.push({ name: 'PartnerDetails', params: { id: partner.id } });
};

const getStatusColor = (status) => {
  return status === 'Accepted' ? 'green-lighten-4 text-green-darken-4' : 'orange-lighten-4 text-orange-darken-4';
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
</style>