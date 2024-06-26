<template>
    <div class="d-flex justify-center">
        <div v-for="(step, index) in steps" :key="index" class="mx-4 d-flex flex-column align-center d-md-block">
            <v-avatar :color="currentStep === index + 1 ? 'primary' : 'muted text-white'" size="28" class="me-2">
                {{ index + 1 }}
            </v-avatar>

            <span>{{ step.name }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    steps: Array,
    currentStep: Number
});
</script>
