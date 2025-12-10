<template>
    <div class="d-flex flex-column align-center justify-center py-12 text-center">
        <v-avatar size="120" color="deep-purple-lighten-5" class="mb-6">
            <v-icon size="64" color="deep-purple-accent-2">mdi-web-plus</v-icon>
        </v-avatar>
        <h3 class="text-h5 font-weight-bold mb-2">Create your first Microsite</h3>
        <p class="text-body-1 text-grey-darken-1 mb-8" style="max-width: 400px;">
            Showcase your portfolio, business, or profile in minutes. It's easy and professional.
        </p>
        <v-btn class="btn-primary text-white text-capitalize" height="44" flat @click="$emit('create')">
            <template v-slot:prepend>
                <div class="d-inline-flex align-center justify-center mr-2"
                    style="width: 20px; height: 20px; border-radius: 30%; border: 1px solid white;">
                    <v-icon size="16" color="white">mdi-plus</v-icon>
                </div>
            </template>
            Create new microsite
        </v-btn>
    </div>
</template>

<script setup>
defineEmits(['create']);
</script>
