<template>
    <div class="forget-password py-10">
        <v-container class="text-center pt-16">
            <v-avatar
                image="./images/forgetLock.svg"
                color="white"
                class="pa-4 animate__animated animate__backInDown"
                size="200"
            ></v-avatar>
            <p class="title animate__animated animate__backInLeft">{{ $t('password.forgetPassword') }}</p>
            <p class="info animate__animated animate__backInRight">
                {{ $t('password.dontWorry') }}
            </p>

            <form @submit.prevent="sendEmail">
                <v-text-field
                    v-model="email"
                    :label="$t('password.enterEmail')"
                    prepend-inner-icon="mdi-email"
                    type="email"
                    class="w-100 w-md-50 mx-auto mt-10 bg-grey300"
                    hide-details
                ></v-text-field>

                <v-btn block color="skin" class="mt-10 animate__animated animate__backInUp" size="large" type="submit" :loading="loading">{{
                    $t('password.submit')
                }}</v-btn>
            </form>
        </v-container>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
const email = ref('');

import { useI18n } from 'vue-i18n';
import axios from 'axios';
const { t } = useI18n({ useScope: 'global' });

const loading = ref(false);

const sendEmail = async () => {
    if (!email.value) return toast.error(t('auth.email_error'));
    loading.value = true;
    try {
        let data = {
            email: email.value,
            isAdmin: 0
        };
        const res = await axios.post('api/forget-password', data);
        if (res.status == 200) {
            toast.success(t('auth.pass_link'));
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    loading.value = false;
};
</script>

<style lang="scss" scoped>
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
