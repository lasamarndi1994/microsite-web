<template>
    <v-dialog v-model="dialogVisible" max-width="500" scroll-strategy="none">
        <v-card class="rounded-lg pa-6">
            <div class="d-flex justify-center mb-4">
                <v-avatar color="orange-lighten-5" size="64">
                    <v-icon icon="mdi-alert-circle-outline" color="orange" size="40"></v-icon>
                </v-avatar>
            </div>
            <v-card-text class="text-center text-body-1">
                You reach limit for createing micro site if you want create more send the requrest to. will allow will
                create access
            </v-card-text>
            <v-card-actions class="justify-center mt-4">
                <v-btn color="btn-primary" variant="flat" class="btn-primary text-white px-6 text-capitalize rounded-lg"
                    height="44" @click="$emit('update:modelValue', false)">
                    Okay, Got it
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const dialogVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});
</script>
