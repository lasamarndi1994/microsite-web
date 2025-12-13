import { ref } from 'vue';
import api from '@/api';

export function useMicrositeLimit() {
    const micrositeCount = ref(0);
    const showLimitDialog = ref(false);

    const fetchUserLimit = async () => {
        try {
            console.log('useMicrositeLimit: fetching /auth/user');
            const response = await api.get('/auth/user');
            const data = response.data.data;
            console.log('useMicrositeLimit: response data:', data);
            // Using the exact property name found in DashboardPage.vue investigation
            if (data && data.microsite_count !== undefined) {
                micrositeCount.value = data.microsite_count;
                console.log('useMicrositeLimit: updated micrositeCount:', micrositeCount.value);
            } else {
                console.log('useMicrositeLimit: microsite_count not found in data');
            }
        } catch (error) {
            console.error('Error fetching user limit:', error);
        }
    };

    const checkLimit = (onAllowed) => {
        console.log('useMicrositeLimit: checking limit. Count:', micrositeCount.value);
        if (micrositeCount.value >= 3) {
            console.log('useMicrositeLimit: limit reached (>=3)');
            showLimitDialog.value = true;
        } else {
            console.log('useMicrositeLimit: limit passed (<3)');
            if (onAllowed && typeof onAllowed === 'function') {
                onAllowed();
            }
        }
    };

    return {
        micrositeCount,
        showLimitDialog,
        fetchUserLimit,
        checkLimit
    };
}
