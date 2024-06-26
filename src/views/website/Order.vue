<template>
    <div class="my-order">
        <v-container>
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
            <div class="order-details py-10">
                <div v-if="loading">
                    <v-progress-linear indeterminate color="primary" v-if="loading"></v-progress-linear> <br />
                    <div class="skelton"></div>
                    <div class="skelton"></div>
                    <div class="skelton" style="height: 500px"></div>
                </div>
                <div v-else-if="!loading && order">
                    <UiParentCard>
                        <v-card-title class="mx-5">{{ $t('order.order') }}: #{{ order.orderId }}</v-card-title>
                        <v-divider class="mb-10"></v-divider>
                        <v-row class="pa-4 font-weight-bold">
                            <v-col cols="12" md="6">
                                <p><v-icon class="mr-2">mdi-phone-outline</v-icon>{{ $t('order.phone') }}: {{ order.phoneNumber }}</p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p>
                                    <v-icon class="mr-2">mdi-cash-multiple</v-icon>
                                    {{ $t('order.total') }}:
                                    <v-chip color="textSecondary"> {{ order.total }} {{ $t('product.le') }} </v-chip>
                                </p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p><v-icon class="mr-2">mdi-credit-card-outline</v-icon>{{ $t('order.pType') }}: {{ order.type }}</p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p>
                                    <v-icon class="mr-2">mdi-truck-outline</v-icon>
                                    {{ $t('order.status') }}:
                                    <v-chip
                                        :color="
                                            order.Status == 'NEW ORDER'
                                                ? 'skin'
                                                : order.Status == 'PROCESSING'
                                                ? 'primary'
                                                : order.Status == 'CANCELED'
                                                ? 'error'
                                                : order.Status == 'REFUND'
                                                ? 'error'
                                                : order.Status == 'FINISHED'
                                                ? 'success'
                                                : order.Status == 'SHIPPING'
                                                ? 'warning'
                                                : 'black'
                                        "
                                        >{{ order.Status }}</v-chip
                                    >
                                </p>
                            </v-col>
                        </v-row>
                    </UiParentCard>
                    <v-divider class="mb-10"></v-divider>

                    <UiParentCard class="mt-16" v-if="order.type == 'PAYMENT'">
                        <v-card-title class="mx-5"
                            ><v-icon class="mr-2">mdi-credit-card-fast-outline</v-icon> {{ $t('order.paymentStatus') }}</v-card-title
                        >
                        <v-divider class="mb-10"></v-divider>

                        <v-card-text class="text-h6 font-weight-bold">
                            <v-row>
                                <v-col cols="12" md="6"> {{ $t('order.id') }} : {{ order.Payment?.id }} </v-col>
                                <v-col cols="12" md="6">{{ $t('order.paymentId') }}: {{ order.Payment?.payment_id }} </v-col>
                                <v-col cols="12" md="6"> {{ $t('order.paymentStatus') }} : {{ order.Payment?.status }} </v-col>
                            </v-row>
                        </v-card-text>
                    </UiParentCard>
                    <v-divider class="my-10"></v-divider>
                    <UiParentCard v-if="order.Location">
                        <v-card-title> <v-icon class="mx-2">mdi-map-outline</v-icon>{{ $t('order.address') }}</v-card-title>
                        <v-divider class="mb-10"></v-divider>
                        <v-card-text class="font-weight-bold">
                            <p class="text-h6" v-if="order.address">{{ $t('order.adress') }}: {{ order.address }}</p>
                            <v-row class="pa-4 font-weight-bold">
                                <v-col cols="12" md="6">
                                    <p>
                                        <v-icon class="mx-2">mdi-map-outline</v-icon>{{ $t('address.state') }}:
                                        {{
                                            $i18n.locale === 'EN' ? order.Location?.governorate.gov_en : order.Location?.governorate.gov_ar
                                        }}
                                    </p>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <p>
                                        <v-icon class="mx-2">mdi-city</v-icon>{{ $t('address.city') }}:
                                        {{ $i18n.locale === 'EN' ? order.Location?.city.city_en : order.Location?.city.city_ar }}
                                    </p>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <p>
                                        <v-icon class="mx-2">mdi-map-outline</v-icon>{{ $t('address.street') }}:
                                        {{ order.Location?.StreetAddress }}
                                    </p>
                                </v-col>
                                <v-col cols="12" md="6" v-if="order.Location?.extraInfoAddress">
                                    <p>
                                        <v-icon class="mx-2">mdi-home-outline</v-icon>{{ $t('order.extra') }}:
                                        {{ order.Location?.extraInfoAddress }}
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </UiParentCard>
                    <v-divider class="my-10"></v-divider>
                    <UiParentCard>
                        <v-card-title class="mx-5">{{ $t('order.transactions') }} </v-card-title>
                        <v-divider class="mb-10"></v-divider>

                        <v-card-text>
                            <v-timeline align="start" side="end">
                                <v-timeline-item
                                    :dot-color="
                                        transaction.status == 'NEW ORDER'
                                            ? 'skin'
                                            : transaction.status == 'PROCESSING'
                                            ? 'primary'
                                            : transaction.status == 'CANCELED'
                                            ? 'error'
                                            : transaction.status == 'REFUND'
                                            ? 'error'
                                            : transaction.status == 'FINISHED'
                                            ? 'success'
                                            : transaction.status == 'SHIPPING'
                                            ? 'warning'
                                            : 'black'
                                    "
                                    size="small"
                                    v-for="transaction in order.Transactions"
                                    :key="transaction.OrderId"
                                >
                                    <div class="d-flex">
                                        <strong class="me-4">{{ transaction.created_at }}</strong>
                                        <div>
                                            <strong>{{ transaction.status }}</strong>
                                            <div class="text-caption">{{ $t('order.order') }}: {{ transaction.OrderId }}</div>
                                        </div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card-text>
                    </UiParentCard>
                    <v-divider class="my-10"></v-divider>
                    <UiParentCard>
                        <div v-if="order.Bundle">
                            <v-card-title class="mx-5"><v-icon class="mx-2">mdi-laptop</v-icon> Bundle</v-card-title>
                            <v-divider class="mb-10"></v-divider>

                            <v-card-text class="font-weight-bold text-h6">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <p><v-icon class="mr-2">mdi-identifier</v-icon>{{ $t('bundle.id') }}: {{ order.Bundle.id }}</p>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <p><v-icon class="mr-2">mdi-monitor</v-icon>{{ $t('bundle.name') }}: {{ order.Bundle.name }}</p>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <p>
                                            <v-icon class="mr-2">mdi-cash</v-icon>{{ $t('bundle.price') }}: {{ order.Bundle.price }}
                                            {{ $t('product.le') }}
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <p>
                                            <v-icon class="mr-2">mdi-palette-outline</v-icon>{{ $t('bundle.color') }}:
                                            {{ order.Bundle.color }}
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <p>
                                            <v-icon class="mr-2">mdi-microsoft-windows</v-icon>{{ $t('bundle.OS') }}:
                                            {{ order.Bundle.Operating_system }}
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <p>
                                            <v-icon class="mr-2">mdi-weight-gram</v-icon>{{ $t('bundle.weight') }}:
                                            {{ order.Bundle.Weight_in_gram }}
                                        </p>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </div>

                        <v-card-title class="mt-4 mx-5" v-if="order.products.length"
                            ><v-icon class="mx-2">mdi-package-variant-closed</v-icon> {{ $t('order.products') }}</v-card-title
                        >
                        <v-divider class="mb-10"></v-divider>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6" lg="3" v-for="product in order.products" :key="product.id">
                                    <v-card class="pa-4">
                                        <v-img
                                            height="200px"
                                            :src="apiUrl + product.product.ImagePath + product.product.mediaFirst?.name"
                                            cover
                                        ></v-img>
                                        <v-card-title> {{ product.product.name }} X {{ product.quantity }}</v-card-title>
                                        <v-card-subtitle v-if="product.product.description">
                                            {{ product.product.description }}
                                        </v-card-subtitle>
                                        <v-card-text>
                                            <p>
                                                {{ $t('bundle.price') }}:<span class="font-weight-bold">
                                                    {{ product.total }} {{ $t('product.le') }}</span
                                                >
                                            </p>
                                            <p class="mt-2">
                                                {{ $t('order.quantityOrdered') }}: <big>{{ product.quantity }}</big>
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </UiParentCard>
                    <v-divider class="my-10"></v-divider>
                    <div class="text-center" v-if="order.Status == 'PROCESSING' || order.Status == 'NEW ORDER'">
                        <v-btn size="x-large" color="error" :loading="cancelLoading" @click="cancelOrder">{{ $t('order.cancel') }} </v-btn>
                    </div>
                </div>
                <div v-else>
                    <div class="approved text-center mt-16 no-order">
                        <v-icon size="200" color="warning" style="text-align: center">mdi-truck-alert</v-icon>
                        <p class="font-weight-bold text-error" style="font-size: 1.2rem; text-align: center">{{ err }}</p>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import UiParentCard from '@/components/shared/UiParentCard.vue';

import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
const loading = ref(false);
const order = ref();
const err = ref('');
const apiUrl = import.meta.env.VITE_API_URL;
const cancelLoading = ref(false);
const { t } = useI18n({ useScope: 'global' });
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();

const user = computed(() => authStore.getUser);

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
const items = [
    {
        title: t('bread.account'),
        disabled: false,
        href: '/profile'
    },
    {
        title: t('bread.order'),
        disabled: true,
        href: 'MyOrder'
    }
];

onMounted(async () => {
    window.scrollTo(0, 0);

    if (!user.value) {
        useRouter().push('/login');
    } else {
        await loadOrder();
    }
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

watch(
    props,
    (value) => {
        window.scrollTo(0, 0);

        order.value = null;
        loadOrder();
    },
    { deep: true }
);

const loadOrder = async () => {
    loading.value = true;
    try {
        const res = await axios.get('api/orders/' + props.id);
        if (res.status == 200) {
            order.value = res.data.data;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        err.value = error.message;
        toast.error(error.message);
    }
    loading.value = false;
};
const cancelOrder = async () => {
    cancelLoading.value = true;
    try {
        const data = {
            order_id: props.id
        };
        if (order.value?.type == 'PAYMENT') {
            data.status = 6;
        } else {
            data.status = 5;
        }

        try {
            const res = await axios.put('api/orders-status', data);
            if (res.status == 202) {
                toast.success(t('order.canceled'), { autoClose: 1000 });
                setTimeout(async () => {
                    await loadOrder();
                }, 1000);
            } else {
                throw new Error(res.response?.data?.message || 'Something went wrong, try again later');
            }
        } catch (error) {
            toast.error(error.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    cancelLoading.value = false;
};
</script>

<style lang="scss" scoped>
.skelton {
    height: 200px;
    background: rgba(128, 128, 128, 0.104);
    margin-bottom: 20px;
    border-radius: 30px;
}
.no-order {
    text-align: center !important;
}
</style>
