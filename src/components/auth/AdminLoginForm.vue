<template>
    <form @submit.prevent="login">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Email</v-label>
                <v-text-field
                    variant="outlined"
                    color="primary"
                    v-model="state.email"
                    prepend-inner-icon="mdi-account"
                    :error-messages="v$.email.$error ? v$.email.$errors[0].$message : ''"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Password</v-label>
                <v-text-field
                    variant="outlined"
                    type="password"
                    color="primary"
                    v-model="state.password"
                    prepend-inner-icon="mdi-lock"
                    :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
                ></v-text-field>
            </v-col>
            <router-link to="/auth/dashboard/forget-password" class="ml-5 text-primary text-decoration-none">forgot your password?</router-link>
            <v-col cols="12" class="pt-0 mt-10">
                <v-btn type="submit" color="primary" size="large" block flat :loading="state.loading">Login</v-btn>
            </v-col>
        </v-row>
    </form>
</template>
<script>
import { reactive, computed } from 'vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
export default {
    setup() {
        const authStore = useAuthStore();

        const router = useRouter();
        const state = reactive({
            email: '',
            password: '',
            loading: false
        });
        const rules = computed(() => {
            return {
                email: { required, email },
                password: { required, minLength: minLength(6) }
            };
        });
        const v$ = useVuelidate(rules, state);

        const login = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        email: state.email,
                        password: state.password
                    };
                    await authStore.adminLogin(data);
                    toast.success('Login Successfully', {
                        autoClose: 1000
                    });
                    router.push({ name: 'Dashboard' });
                } catch (err) {
                    toast.error(err.message, {
                        autoClose: 1000
                    });
                }
                state.loading = false;
            } else {
                toast.error('ادخل بياناتك لتسجيل الدخول', {
                    autoClose: 1000
                });
            }
        };

        return { state, login, v$ };
    }
};
</script>
