<template>
    <div class="login">
        <v-row>
            <v-col cols="12" class="d-none d-md-block background animate__animated animate__backInLeft" md="6">
                <img src="@/assets/images/background/loginOverlay.png" alt="" />
                <router-link to="/" class="text-center">
                    <v-img
                        src="/images/logoWhite.png"
                        width="300"
                        style="height: 200px"
                        class="mx-auto mb-9 animate__animated animate__backInDown"
                    ></v-img>
                </router-link>
            </v-col>
            <v-col cols="12" md="6" class="login-form animate__animated animate__backInRight">
                <v-container>
                    <form class="w-100 pa-16 pt-0 elevation-1 mr-3 ml-md-0" @submit.prevent="login">
                        <v-progress-linear indeterminate color="skin" v-if="loading"></v-progress-linear> <br />
                        <router-link to="/" class="text-center">
                            <v-img
                                src="/images/logo.svg"
                                width="150"
                                style="height: 200px"
                                class="mx-auto mb-9 animate__animated animate__backInDown"
                            ></v-img>
                        </router-link>

                        <v-text-field
                            :label="$t('auth.email')"
                            prepend-inner-icon="mdi-account"
                            class="my-6 animate__animated animate__backInLeft"
                            variant="outlined"
                            v-model="email"
                            :error-messages="v$.email.$error ? v$.email.$errors[0].$message : ''"
                        ></v-text-field>
                        <v-text-field
                            :label="$t('auth.password')"
                            prepend-inner-icon="mdi-lock"
                            type="password"
                            class="my-6 animate__animated animate__backInRight"
                            variant="outlined"
                            v-model="password"
                            :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
                        ></v-text-field>

                        <div class="d-flex justify-space-between align-center animate__animated animate__backInUp action">
                            <v-btn
                                :loading="loading"
                                color="skin"
                                size="x-large"
                                style="width: 200px; font-weight: bold; font-size: 1.5rem"
                                type="submit"
                                >{{ $t('auth.login') }}</v-btn
                            >
                            <v-list-item link color="primary" :to="{ name: 'forgetPassword' }">{{ $t('auth.forget') }}</v-list-item>
                        </div>
                        <p :class="['my-10', `text-${$i18n.locale == 'AR' ? 'center' : 'center'}`, 'font-weight-bold']">
                            {{ $t('auth.dontHaveAccount') }}
                            <router-link to="/register" class="text-decoration-none">{{ $t('auth.signup') }}</router-link>
                        </p>
                    </form>
                </v-container>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import type { LoginCredentials } from '@/types/website/AuthTypes';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, email as c } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

const email = ref<string>('');
const password = ref<string>('');
const loading = ref<boolean>(false);
const authStore = useAuthStore();
const rules = {
    email: { required, c },
    password: { required }
};
const v$ = useVuelidate(rules, { email, password });
const router = useRouter();
const login = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        loading.value = true;
        try {
            const data: LoginCredentials = {
                email: email.value,
                password: password.value
            };

            await authStore.Login(data);

            const lastRoute = localStorage.getItem('lastRoute');
            console.log(lastRoute);
            if (lastRoute) {
                router.push(lastRoute);
            } else {
                router.push({ name: 'landing' });
            }
        } catch (err: any) {
            toast.error(err.message, {
                autoClose: 1000
            });
        }
        loading.value = false;
    } else {
        toast.error(t('auth.error'), {
            autoClose: 1000
        });
    }
};
</script>

<style lang="scss">
.login {
    height: 100vh;
    .login-form,
    .background {
        height: calc(101vh + 3px);
    }
    .login-form {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eff3fd;
        form {
            background: white;
        }
        h2 {
            letter-spacing: 10px;
            font-size: 3rem;
            @media (max-width: 720px) {
                font-size: 2rem;
            }
        }
    }
    .action {
        flex-wrap: wrap;
    }
    .background {
        position: relative;
        display: grid;
        place-content: center;
        img {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
        }
        background: url('@/assets/images/background/login2.png') no-repeat center;
        background-size: cover;
    }
}
</style>
