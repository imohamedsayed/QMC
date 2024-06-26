<template>
    <div class="d-flex justify-center align-center text-center h-100vh payment-message">
        <div>
            <img src="@/assets/images/background/paymentFailed.svg" class="mx-auto" width="500" alt="404" />
            <h1 class="text-h1 pt-3" style="text-align: center">{{ $t('payment.failed') }}</h1>
            <h4 class="text-h4 my-8" style="text-align: center">{{ $t('payment.failedMessage') }}</h4>
            <v-btn flat color="error" class="mb-4" size="x-large" to="/">{{ $t('error.goHome') }}</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/AuthStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();

const user = computed(() => authStore.getUser);

onMounted(() => {
    if (!user.value) useRouter().push('/login');
});
</script>

<style lang="scss">
.payment-message {
    text-align: center !important;
    img {
        @media (max-width: 500px) {
            width: auto !important;
        }
    }
}
</style>
