<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4 text-center cursor-pointer" @click="$router.push('/')">
                                <img src="@/assets/images/logo.png" width="200" height="120" />
                            </div>
                            <div class="text-body-1 text-muted text-center mb-3">Future for computer hardware</div>
                            <LoginForm />
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Logo from '@/components/admin/layout/full/logo/Logo.vue';
import LoginForm from '@/components/auth/AdminLoginForm.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

export default {
    components: { Logo, LoginForm },
    setup() {
        const authStore = useAuthStore();
        const admin = authStore.getAdmin;
        const router = useRouter();

        onMounted(() => {
            if (admin) {
                router.push({ name: 'Dashboard' });
            }
        });
    }
};
</script>
