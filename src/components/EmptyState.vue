<template>
    <div class="empty-state d-flex flex-column align-center justify-center pa-8 text-center h-100">
        <div class="empty-state__icon mb-6">
            <v-avatar size="60" color="deep-purple-lighten-5" class="mb-2">
                <v-icon size="50" color="deep-purple-accent-2">mdi-web-plus</v-icon>
            </v-avatar>
        </div>

        <h3 class="text-h7 font-weight-bold text-high-emphasis mb-2">
            {{ title }}
        </h3>

        <p class="text-body-1 text-medium-emphasis mb-6 mw-400 mx-auto">
            {{ description }}
        </p>

        <slot name="action">
            <v-btn class="btn-primary text-white text-capitalize w-100 w-lg-auto" height="44" flat
                @click="$emit('action')">
                <template v-slot:prepend>
                    <div class="d-inline-flex align-center justify-center mr-2"
                        style="width: 20px; height: 20px; border-radius: 30%; border: 1px solid white;">
                        <v-icon size="16" color="white">mdi-plus</v-icon>
                    </div>
                </template>
                {{ actionLabel }}
            </v-btn>
        </slot>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'Create your new Microsite'
    },
    description: {
        type: String,
        default: 'Showcase your portfolio, business, or profile in minutes. It\'s easy and professional.'
    },
    icon: {
        type: String,
        default: 'mdi-web-plus'
    },
    actionLabel: {
        type: String,
        default: ''
    }
});

defineEmits(['action']);
</script>

<style scoped>
.empty-state {
    min-height: 400px;
}

.mw-400 {
    max-width: 400px;
}
</style>
