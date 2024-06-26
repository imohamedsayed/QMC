<template>
    <div class="forget-password py-10">
        <v-img src="./images/logo.svg" width="400" class="mx-auto">
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
            </template>
        </v-img>
        <form @submit.prevent="resetPassword">
            <v-text-field
                :label="$t('password.newPassword')"
                prepend-inner-icon="mdi-lock"
                class="mb-3 mt-15 animate__animated animate__backInRight"
                type="password"
                color="primary"
                v-model="password"
                :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
            ></v-text-field>
            <v-text-field
                :label="$t('password.confirmPassword')"
                prepend-inner-icon="mdi-lock"
                class="mb-10 animate__animated animate__backInRight"
                type="password"
                color="primary"
                v-model="passwordConfirm"
                :error-messages="v$.passwordConfirm.$error ? v$.passwordConfirm.$errors[0].$message : ''"
            ></v-text-field>

            <v-btn block color="skin" size="large" class="animate__animated animate__bounceInLeft" type="submit" :loading="loading">{{
                $t('password.resetPassword')
            }}</v-btn>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const { t } = useI18n({ useScope: 'global' });

const password = ref<string>('');
const passwordConfirm = ref<string>('');
const loading = ref<boolean>(false);
const rules = {
    password: { required, minLength: minLength(6) },
    passwordConfirm: { required, sameAs: sameAs(password) }
};
const v$ = useVuelidate(rules, { password, passwordConfirm });

const route = useRoute();
const router = useRouter();

const resetPassword = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        loading.value = true;
        try {
            let data = {
                token: route.query.token,
                password: password.value,
                password_confirmation: passwordConfirm.value,
                isAdmin: 0
            };
            const res: any = await axios.post('api/reset-password', data);
            if (res.status == 200) {
                toast.success(t('profile.password_success'), { autoClose: 1000 });
                setTimeout(() => {
                    router.push({ name: 'login' });
                }, 1000);
            } else {
                throw new Error(res.response.data.message);
            }
        } catch (err: any) {
            toast.error(err.message, {
                autoClose: 1000
            });
        }
        loading.value = false;
    } else {
        toast.error(t('profile.password_error'), {
            autoClose: 1000
        });
    }
};
</script>

<style lang="scss">
.forget-password {
    height: 100vh;
    background: url('@/assets/images/background/reset.jpeg') no-repeat center;
    background-size: cover;
    p {
        &.title {
            font-size: 2rem;
            font-weight: bold;
        }
        &.info {
            font-size: 1.2rem;
        }
        margin: 18px 0;
    }
    form {
        width: 50%;
        margin: 0 auto;
        @media (max-width: 763px) {
            width: 100%;
        }
    }
}
</style>
