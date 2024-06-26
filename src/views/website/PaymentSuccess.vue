<template>
    <div class="d-flex justify-center align-center text-center h-100vh payment-message">
        <div>
            <img src="@/assets/images/background/paymentSuccess.svg" class="mx-auto" width="500" alt="404" />
            <h1 class="text-h1 pt-3 color-success" style="text-align: center">{{ $t('payment.success') }}</h1>
            <h4 class="text-h4 my-8" style="text-align: center">{{ $t('payment.successMessage') }}</h4>
            <v-btn flat color="primary" class="mb-4" size="x-large" to="/">{{ $t('error.goHome') }}</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/AuthStore';
import { useCartStore } from '@/stores/CartStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const cartStore = useCartStore();

const user = computed(() => authStore.getUser);

onMounted(() => {
    if (!user.value) useRouter().push('/login');

    cartStore.emptyCart();
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
