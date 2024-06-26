<template>
    <div class="verify py-15">
        <v-container class="mt-16">
            <div class="text-center text-skin" v-if="!loading">
                <div v-if="success" class="text-content pa-8">
                    <v-icon size="250" class="animate__animated animate__backInDown">mdi-check-circle-outline</v-icon>
                    <h2 class="mt-3 animate__animated animate__fadeIn">{{ $t('auth.congrats') }}</h2>
                    <h3 class="animate__animated animate__backInUp">{{ $t('auth.verified') }}</h3>
                    <v-btn color="skin" class="mt-4" size="large" :to="{ name: 'login' }">{{ $t('auth.login') }}</v-btn>
                </div>
                <div v-else class="text-content pa-8">
                    <v-icon size="250" class="animate__animated animate__backInDown"> mdi-alpha-x-circle-outline</v-icon>
                    <h3 class="animate__animated animate__backInUp">{{ $t('auth.verification_failed') }}</h3>
                    <h3 class="mt-2 text-error">{{ errorMessage }}</h3>
                </div>
            </div>
            <div class="text-center mt-16" v-else>
                <v-progress-circular :size="200" width="8" color="primary" indeterminate></v-progress-circular>
            </div>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const success = ref<boolean>(false);
const loading = ref<boolean>(true);
const errorMessage = ref<string>('');
const route = useRoute();

onMounted(async () => {
    try {
        const token = route.query.token as string;
        const res: any = await axios.get('api/verify/' + token);
        if (res.status == 200) {
            success.value = true;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error: any) {
        errorMessage.value = error.message;
    }
    loading.value = false;
});
</script>

<style lang="scss" scoped>
.verify {
    background: url('./images/account_verified.svg') top center no-repeat;
    background-size: cover;
    min-height: 80vh;
    h2 {
        font-size: 2rem;
    }
    h3 {
        font-size: 1.6rem;
    }
    .text-content {
        backdrop-filter: blur(4px);
        background: #ffffffb6;
    }
}
</style>
