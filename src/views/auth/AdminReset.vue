<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4" @click="$router.push('/')">
                                <img src="@/assets/images/logo.png" width="200" height="120" />
                            </div>
                            <form @submit.prevent="resetPassword">
                                <v-row class="d-flex mb-3">
                                    <v-col cols="12">
                                        <v-label class="font-weight-bold mb-1">New Password</v-label>
                                        <v-text-field
                                            variant="outlined"
                                            color="primary"
                                            type="password"
                                            v-model="state.password"
                                            prepend-inner-icon="mdi-lock"
                                            :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-label class="font-weight-bold mb-1">Confirm Password</v-label>
                                        <v-text-field
                                            variant="outlined"
                                            color="primary"
                                            type="password"
                                            v-model="state.passwordConfirm"
                                            prepend-inner-icon="mdi-lock"
                                            :error-messages="v$.passwordConfirm.$error ? v$.passwordConfirm.$errors[0].$message : ''"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="pt-0 mt-10">
                                        <v-btn type="submit" color="primary" size="large" block flat :loading="state.loading"
                                            >Reset Password</v-btn
                                        >
                                    </v-col>
                                </v-row>
                            </form>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Logo from '@/components/admin/layout/full/logo/Logo.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import axios from 'axios';
export default {
    components: { Logo },
    setup() {
        const authStore = useAuthStore();
        const admin = authStore.getAdmin;
        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            if (admin) {
                router.push({ name: 'Dashboard' });
            }
        });

        const state = reactive({
            passwordConfirm: '',
            password: ''
        });

        const rules = computed(() => {
            return {
                password: { required, minLength: minLength(6) },
                passwordConfirm: { required, sameAs: sameAs(state.password) }
            };
        });
        const v$ = useVuelidate(rules, state);

        const resetPassword = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    const res = await axios.post('api_dashboard/reset-password', {
                        token: route.query.token,
                        password: state.password,
                        password_confirmation: state.passwordConfirm,
                    });
                    if ((res.status = 200)) {
                        toast.success('Password was successfully changed', { autoClose: 1000 });
                        setTimeout(() => {
                            router.push({ name: 'adminLogin' });
                        }, 1000);
                    } else {
                        throw res.response.data.message;
                    }
                } catch (err) {
                    toast.error(err.message, {
                        autoClose: 1000
                    });
                }
                state.loading = false;
            } else {
                toast.error('Please provide the required information correctly', {
                    autoClose: 1000
                });
            }
        };
        return { resetPassword, state, v$ };
    }
};
</script>
