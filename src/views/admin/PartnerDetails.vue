<template>
  <app-layout>
    <v-card flat class="card-padding rounded-xl" min-height="80vh">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="d-flex align-center justify-space-between mb-1">
          <div>
            <div class="d-flex align-center gap-3">
              <v-btn icon="mdi-arrow-left" variant="text" @click="goBack" class="mr-1"></v-btn>
              <h1 class="font-weight-bold text-grey-darken-3 mb-0"
                :class="$vuetify.display.smAndDown ? 'fs-16' : 'fs-24'">Partner Details</h1>
            </div>
            <p class="text-grey-darken-1 ml-14"
              :class="$vuetify.display.smAndDown ? 'text-subtitle-2' : 'text-subtitle-1'">
              Essential partner information and microsite submissions
            </p>
          </div>

        </div>
      </div>
      <!-- Partner Info Card -->
      <v-card flat class="bg-purple-lighten-5 mb-8 rounded-lg pa-6">
        <div class="d-flex flex-column flex-sm-row align-center justify-space-between ga-4">
          <div class="d-flex flex-column flex-sm-row align-center ga-4 w-100">
            <v-avatar size="80" class="flex-shrink-0">
              <v-img :src="getImage(partnerInfo.user_avatar, 'uploads/avatar/')" cover
                :lazy-src="getImage(partnerInfo.user_avatar, 'uploads/avatar/')">

              </v-img>
            </v-avatar>
            <div class="text-center text-sm-left">
              <div class="text-h5 font-weight-bold text-grey-darken-3 mb-1">{{ partnerInfo.user_name }}</div>
              <div class="text-body-1 text-grey-darken-2 mb-2">{{ partnerInfo.business_name }}</div>
              <div class="d-flex flex-column flex-sm-row align-center ga-4">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-email-outline" size="18" class="mr-2 text-grey-darken-1"></v-icon>
                  <span class="text-body-2 text-grey-darken-2">{{ partnerInfo.email }}</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon icon="mdi-phone-outline" size="18" class="mr-2 text-grey-darken-1"></v-icon>
                  <span class="text-body-2 text-grey-darken-2">{{ partnerInfo.mobile_number }}</span>
                </div>
              </div>
            </div>
          </div>
          <v-chip :color="getStatusColor('Action Required')" size="default" variant="flat" class="px-4 flex-shrink-0">
            <span class="text-capitalize font-weight-medium"> Action Required -</span>

          </v-chip>
          <v-chip :color="getStatusColor('Pending')" size="default" variant="flat" class="px-4 flex-shrink-0">
            <span class="text-capitalize font-weight-medium"> {{ pendingCount }} </span>
          </v-chip>
        </div>
      </v-card>

      <!-- Filters Section -->
      <v-row class="mb-6" align="center">
        <v-col cols="12" md="6">
          <v-text-field v-model="search" placeholder="Search microsites" prepend-inner-icon="mdi-magnify"
            variant="outlined" density="comfortable" hide-details bg-color="white" class="rounded-lg"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-end gap-4 align-center">
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

      <!-- Microsites Table -->
      <v-card flat border class="rounded-lg">
        <v-table>
          <thead>
            <tr>
              <th class="text-left text-caption font-weight-bold">Microsite</th>
              <th class="text-left text-caption font-weight-bold">Last Update</th>
              <th class="text-left text-caption font-weight-bold">Status</th>
              <th class="text-right text-caption font-weight-bold">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="4" class="text-center py-8">
                <v-skeleton-loader type="table-row-divider@3"></v-skeleton-loader>
              </td>
            </tr>
            <tr v-if="!loading && microsites.length === 0">
              <td colspan="4" class="text-center py-8">
                <div class="d-flex flex-column align-center justify-center">
                  <v-icon icon="mdi-magnify-remove-outline" size="48" color="grey-lighten-1 mb-2"></v-icon>
                  <div class="text-body-1 text-grey-darken-1">Data not found.</div>
                </div>
              </td>
            </tr>
            <tr v-if="!loading" v-for="(item, index) in microsites" :key="index">
              <td class="py-4">
                <div class="d-flex align-center">
                  <v-avatar :color="item.iconBg" rounded="lg" size="40" class="mr-4">
                    <v-img :src="getImage(item.banner_image, 'uploads/banner/')" cover>
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular color="grey-lighten-4" indeterminate size="20"></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                  </v-avatar>
                  <div>
                    <div class="text-subtitle-2 font-weight-bold text-truncate" style="max-width: 400px;">{{
                      item.title }}</div>
                    <div class="text-caption text-grey">{{ item.sub_title }}</div>
                  </div>
                </div>
              </td>
              <td class="text-body-2 text-grey-darken-1">{{ formatDate(item.updated_at) }}</td>
              <td>
                <v-chip :color="getMicrositeStatusColor(item.status)" size="small" variant="flat" class="px-2">
                  <span class="text-capitalize">{{ item.status }}</span>
                </v-chip>
              </td>
              <td class="text-right">
                <v-btn class="text-capitalize rounded-lg"
                  :class="item.status == 'Pending' ? 'btn-primary text-white' : ''"
                  :variant="item.status == 'Pending' ? 'flat' : 'outlined'"
                  :color="item.status == 'Pending' ? undefined : 'primary'" height="34"
                  @click="reviewMicrosite(item)">{{
                    item.status == 'Pending' ? 'Review' : 'View' }}</v-btn>
                <v-btn v-if="item.status === 'Approved'" icon="mdi-content-copy" variant="text" color="grey"
                  size="small" class="ml-2" @click="copyLink(item)">
                  <v-icon>mdi-content-copy</v-icon>
                  <v-tooltip activator="parent" location="bottom">Copy Link</v-tooltip>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="2000" color="success" location="bottom center">
      {{ snackbarText }}
    </v-snackbar>
  </app-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/api';
import { formatDate, getImage } from '@/utils/helpers';

const router = useRouter();
const route = useRoute();

const snackbar = ref(false);
const snackbarText = ref('');

const search = ref('');
const selectedFilter = ref(null);
const selectedFilterLabel = ref(null);

// Debounce function
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const filterOptions = ref([
  {
    label: 'Pending',
    value: 'Pending',
    color: 'orange-lighten-4 text-orange-darken-4',
    icon: 'mdi-clock-outline'
  },
  {
    label: 'Approved',
    value: 'Approved',
    color: 'green-lighten-4 text-green-darken-4',
    icon: 'mdi-check-circle'
  },
  {
    label: 'Rejected',
    value: 'Rejected',
    color: 'red-lighten-4 text-red-darken-4',
    icon: 'mdi-close-circle'
  }
]);

const partnerInfo = ref({});
const pendingCount = ref(0);

const microsites = ref([]);
const loading = ref(false);



const fetchPartnerDetails = async () => {
  loading.value = true;
  try {
    const uuid = route.params.id;
    const params = {
      search: search.value,
      status: selectedFilter.value
    };

    const response = await api.get(`admin/users/${uuid}/microsites`, { params });

    if (response.data.status) {
      loading.value = false;
      partnerInfo.value = response.data.user;
      microsites.value = response.data.data;
      pendingCount.value = response.data.pending_count;
    }
  } catch (error) {
    console.error("Error fetching partner details:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPartnerDetails();
});

// Watch triggers
watch(selectedFilter, () => {
  fetchPartnerDetails();
});

watch(search, debounce(() => {
  fetchPartnerDetails();
}, 200));

const selectFilter = (value) => {
  selectedFilter.value = value;
  const filter = filterOptions.value.find(f => f.value === value);
  selectedFilterLabel.value = filter ? filter.label : null;
};

const clearFilter = () => {
  selectedFilter.value = null;
  selectedFilterLabel.value = null;
};


const goBack = () => {
  router.push({ name: 'AdminDashboard' });
};

const reviewMicrosite = (microsite) => {
  router.push({ name: 'MicrositeReview', params: { id: partnerInfo.value.uuid, uuid: microsite.uuid } });
};

const copyLink = (microsite) => {
  const url = `${window.location.origin}/${partnerInfo.value.user_slug}/${microsite.slug}`;
  navigator.clipboard.writeText(url).then(() => {
    snackbarText.value = "Successfully copied URL";
    snackbar.value = true;
  }).catch(err => {
    console.error('Failed to copy: ', err);
    snackbarText.value = "Failed to copy URL";
    snackbar.value = true;
  });

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
    'Active': 'green-lighten-4 text-green-darken-4',
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
