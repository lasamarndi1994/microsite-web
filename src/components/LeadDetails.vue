<template>
    <div class="lead-details-container">
        <div v-if="loading" class="d-flex justify-center py-4">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>

        <div v-else-if="!leads || leads.length === 0" class="text-center text-grey py-4">
            No leads found.
        </div>

        <v-table v-else density="compact" class="bg-transparent">
            <thead>
                <tr>
                    <th class="text-caption font-weight-bold">Name</th>
                    <th class="text-caption font-weight-bold">Email</th>
                    <th class="text-caption font-weight-bold">Mobile</th>
                    <th class="text-caption font-weight-bold">Date</th>
                    <th class="text-caption font-weight-bold">Response</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lead, index) in leads" :key="index">
                    <td class="text-caption">{{ lead.name }}</td>
                    <td class="text-caption">{{ lead.email }}</td>
                    <td class="text-caption">{{ lead.mobile_number }}</td>
                    <td class="text-caption">{{ formatDate(lead.created_at) }}</td>
                    <td class="text-caption">{{ lead.lead_message || 'N/A' }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
import { formatDate } from '@/utils/helpers';

defineProps({
    leads: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.lead-details-container {
    width: 100%;
}
</style>
