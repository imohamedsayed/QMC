<template>
    <div class="profile py-10">
        <v-container v-if="user">
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon elevation="0" class="bg-background" to="/">
                        <v-icon class="mx-1" size="small" icon="mdi-home" color="primary"></v-icon>
                    </v-btn>
                    <v-icon icon="mdi-chevron-right" v-if="$i18n.locale === 'EN'"></v-icon>
                    <v-icon icon="mdi-chevron-left" v-else></v-icon>
                </template>
                <template v-slot:divider v-if="$i18n.locale === 'EN'">
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
                <template v-slot:divider v-else>
                    <v-icon icon="mdi-chevron-left"></v-icon>
                </template>
            </v-breadcrumbs>

            <h2 class="font-weight-bolder mb-14 mt-8" style="font-size: 2.1rem">{{ $t('profile.title') }}</h2>

            <v-row>
                <v-col cols="12" md="2" class="left">
                    <v-tabs v-model="tab" direction="vertical" color="primary">
                        <v-tab value="account-details">
                            <v-icon start> mdi-account </v-icon>
                            {{ $t('profile.account') }}
                        </v-tab>
                        <v-tab value="orders">
                            <v-icon start> mdi-truck </v-icon>
                            {{ $t('profile.orders') }}
                        </v-tab>
                        <v-tab value="bills">
                            <v-icon start> mdi-cash-multiple </v-icon>
                            {{ $t('profile.bills') }}
                        </v-tab>
                        <v-tab value="bills2">
                            <v-icon start> mdi-cash-multiple </v-icon>
                            {{ $t('profile.bills2') }}
                        </v-tab>
                    </v-tabs>
                </v-col>
                <v-col cols="12" md="10" class="right">
                    <v-window v-model="tab">
                        <v-window-item value="account-details">
                            <div class="settings pa-3">
                                <GeneralInformationForm />
                                <hr class="my-10" />
                                <ChangePasswordForm />
                            </div>
                        </v-window-item>
                        <v-window-item value="orders">
                            <Orders />
                        </v-window-item>
                        <v-window-item value="bills">
                            <div>
                                <BillsList />
                            </div>
                        </v-window-item>
                        <v-window-item value="bills2">
                            <div>
                                <BillsList2 />
                            </div>
                        </v-window-item>
                    </v-window>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useI18n } from 'vue-i18n';

import GeneralInformationForm from '@/components/website/profile/settings/GeneralInformationForm.vue';
import ChangePasswordForm from '@/components/website/profile/settings/ChangePasswordForm.vue';

import BillsList from '@/components/website/profile/bills/BillsList.vue';

import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

import Orders from '@/components/website/profile/orders/Orders.vue';

import BillsList2 from '@/components/website/profile/bills2/BillsList2.vue';

const tab = ref('account-details');
gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n({ useScope: 'global' });
const items = [
    {
        title: t('bread.account'),
        disabled: true,
        href: 'Profile'
    }
];

const authStore = useAuthStore();
const user = computed(() => authStore.getUser);

onMounted(() => {
    if (!user.value) useRouter().push('/login');

    //animations
    gsap.from('.right', {
        x: 400,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.right',
            start: 'top 80%'
        }
    });
    gsap.from('.left', {
        x: -400,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.left',
            start: 'top 80%'
        }
    });

    gsap.from('.user-input', {
        y: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.3
    });
});
const router = useRouter();

watch(
    user,
    (value) => {
        checkAuth();
    },
    { deep: true }
);

const checkAuth = () => {
    if (!user.value) {
        router.push('/login');
    }
};
</script>

<style></style>
