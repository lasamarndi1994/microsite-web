import { ref } from 'vue';
import api from '@/api';

export function useMicrositeLimit() {
    const micrositeCount = ref(0);
    const showLimitDialog = ref(false);

    const fetchUserLimit = async () => {
        try {
            const response = await api.get('/auth/user');
            const data = response.data.data;
            if (data && data.microsite_count !== undefined) {
                micrositeCount.value = data.microsite_count;

            }
        } catch (error) {
            console.error('Error fetching user limit:', error);
        }
    };

    const checkLimit = (onAllowed) => {

        if (micrositeCount.value >= 3) {

            showLimitDialog.value = true;
        } else {

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
