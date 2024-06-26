<template>
    <div class="order-details">
        <div v-if="loading">
            <v-progress-linear indeterminate color="primary" v-if="loading"></v-progress-linear> <br />
            <div class="skelton"></div>
            <div class="skelton"></div>
            <div class="skelton" style="height: 500px"></div>
        </div>
        <div v-else-if="!loading && order">
            <v-card>
                <v-card-title>Order: #{{ order.orderId }}</v-card-title>
                <v-divider class="mb-10"></v-divider>
                <v-row class="pa-4 font-weight-bold">
                    <v-col cols="12" md="6">
                        <p><v-icon class="mr-2">mdi-phone-outline</v-icon>User Phone: {{ order.phoneNumber }}</p>
                    </v-col>
                    <v-col cols="12" md="6">
                        <p>
                            <v-icon class="mr-2">mdi-cash-multiple</v-icon>
                            Total Cost:
                            <v-chip color="textSecondary"> {{ order.total }}$ </v-chip>
                        </p>
                    </v-col>
                    <v-col cols="12" md="6">
                        <p><v-icon class="mr-2">mdi-credit-card-outline</v-icon>Payment Type: {{ order.type }}</p>
                    </v-col>
                    <v-col cols="12" md="6">
                        <p>
                            <v-icon class="mr-2">mdi-truck-outline</v-icon>
                            Order Status:
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
            </v-card>
            <v-card class="mt-16" v-if="order.type == 'PAYMENT'">
                <v-card-title><v-icon class="mr-2">mdi-credit-card-fast-outline</v-icon> Payment Status</v-card-title>
                <v-divider class="mb-10"></v-divider>

                <v-card-text class="text-h6 font-weight-bold">
                    <v-row>
                        <v-col cols="12" md="6"> ID : {{ order.Payment.id }} </v-col>
                        <v-col cols="12" md="6">Payment ID : {{ order.Payment.payment_id }} </v-col>
                        <v-col cols="12" md="6"> Payment Status : {{ order.Payment.status }} </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card class="mt-16" v-if="order.Location">
                <v-card-title> <v-icon class="mr-2">mdi-map-outline</v-icon> Address & Location</v-card-title>
                <v-divider class="mb-10"></v-divider>
                <v-card-text class="font-weight-bold">
                    <p class="text-h6" v-if="order.address">{{ $t('order.adress') }}: {{ order.address }}</p>
                    <v-row class="pa-4 font-weight-bold">
                        <v-col cols="12" md="6">
                            <p>
                                <v-icon class="mx-2">mdi-map-outline</v-icon>{{ $t('address.state') }}:
                                {{ $i18n.locale === 'EN' ? order.Location?.governorate.gov_en : order.Location?.governorate.gov_ar }}
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
            </v-card>
            <v-card class="mt-16">
                <v-card-title><v-icon class="mr-2">mdi-card-account-details-outline</v-icon> Customer Information</v-card-title>
                <v-divider class="mb-10"></v-divider>

                <v-card-text class="font-weight-bold text-h6 mt-6">
                    <v-row>
                        <v-col cols="12" md="6">
                            <p><v-icon class="mr-2">mdi-id-card</v-icon>ID : {{ order.user.id }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <p><v-icon class="mr-2">mdi-account-outline</v-icon>Full Name : {{ order.user.fullName }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <p><v-icon class="mr-2">mdi-email-outline</v-icon>Email : {{ order.user.email }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <p><v-icon class="mr-2">mdi-phone-outline</v-icon>Phone Number : {{ order.user.phoneNumber }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <p>
                                <v-icon class="mr-2" v-if="order.user.gender == 'Male'">mdi-gender-male</v-icon>
                                <v-icon class="mr-2" v-else>mdi-gender-female</v-icon>
                                Gender :
                                {{ order.user.gender }}
                            </p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card class="mt-16">
                <v-card-title>Transactions </v-card-title>
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
                            :key="transaction.created_at"
                        >
                            <div class="d-flex">
                                <strong class="me-4">{{ transaction.created_at }}</strong>
                                <div>
                                    <strong>{{ transaction.status }}</strong>
                                    <div class="text-caption">order: {{ transaction.OrderId }}</div>
                                </div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card>
            <v-card class="mt-16">
                <v-card-title><v-icon class="mr-2">mdi-truck-outline</v-icon> Order Status</v-card-title>
                <v-divider class="mb-10"></v-divider>
                <v-card-text>
                    <v-select color="primary" label="Order Status" variant="outlined" :items="status_options" v-model="orderStatus">
                    </v-select>
                    <v-btn color="primary" @click="updateStatus" :loading="updateLoading">Update status</v-btn>
                </v-card-text>
            </v-card>
            <v-card class="mt-16">
                <div v-if="order.Bundle">
                    <v-card-title><v-icon class="mr-2">mdi-laptop</v-icon> Bundle</v-card-title>
                    <v-divider class="mb-10"></v-divider>

                    <v-card-text class="font-weight-bold text-h6">
                        <v-row>
                            <v-col cols="12" md="6">
                                <p><v-icon class="mr-2">mdi-identifier</v-icon>ID: {{ order.Bundle.id }}</p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p><v-icon class="mr-2">mdi-monitor</v-icon>Name: {{ order.Bundle.name }}</p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p><v-icon class="mr-2">mdi-cash</v-icon>Price: {{ order.Bundle.price }} L.E</p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p><v-icon class="mr-2">mdi-palette-outline</v-icon>Color: {{ order.Bundle.color }}</p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p><v-icon class="mr-2">mdi-microsoft-windows</v-icon>OS: {{ order.Bundle.Operating_system }}</p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p><v-icon class="mr-2">mdi-weight-gram</v-icon>Weight(gm): {{ order.Bundle.Weight_in_gram }}</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </div>

                <v-card-title class="mt-4"><v-icon class="mr-2">mdi-package-variant-closed</v-icon> Products</v-card-title>
                <v-divider class="mb-10"></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6" lg="4" v-for="product in order.products" :key="product.id">
                            <v-card class="pa-4">
                                <v-img
                                    height="200px"
                                    :src="apiUrl + product.product.ImagePath + product.product.mediaFirst?.name"
                                    cover
                                ></v-img>
                                <v-card-title> {{ product.product.name }} X {{ product.quantity }}</v-card-title>
                                <v-card-subtitle v-if="product.product.description"> {{ product.product.description }} </v-card-subtitle>
                                <v-card-text>
                                    <p>
                                        Total Price:<span class="font-weight-bold"> {{ product.total }}$</span>
                                    </p>
                                    <p class="mt-2">
                                        Quantity Ordered: <big>{{ product.quantity }}</big>
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
        <div v-else>
            <div class="approved text-center mt-16">
                <v-icon size="200">mdi-truck-alert</v-icon>
                <p class="font-weight-bold" style="font-size: 1.2rem">An Error occurred while Fetching Error Data</p>
                <p class="font-weight-bold text-error" style="font-size: 1.2rem">{{ err }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
const loading = ref(false);
const order = ref();
const orderStatus = ref();
const updateLoading = ref(false);
const err = ref('');
const orderStatusMap = {
    'NEW ORDER': 1,
    PROCESSING: 2,
    SHIPPING: 3,
    FINISHED: 4,
    CANCELED: 5,
    REFUND: 6,
    EXPIRED_DATE_SHIPPING: 7
};

const status_options = [
    {
        title: 'New Order',
        value: 1
    },
    {
        title: 'Processing',
        value: 2
    },
    {
        title: 'Shipping',
        value: 3
    },
    {
        title: 'Finished',
        value: 4
    },
    {
        title: 'Canceled',
        value: 5
    },
    {
        title: 'Refund',
        value: 6
    },
    {
        title: 'Expired Date Shipping',
        value: 7
    }
];
const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
    await loadOrder();
});

watch(
    props,
    (value) => {
        order.value = null;
        loadOrder();
    },
    { deep: true }
);

const loadOrder = async () => {
    loading.value = true;
    try {
        const res = await axios.get('api_dashboard/orders/' + props.id);
        if (res.status == 200) {
            order.value = res.data.order;
            let index = order?.value?.Status || 0;
            orderStatus.value = orderStatusMap[index];
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        err.value = error.message;
        toast.error(error.message);
    }
    loading.value = false;
};

const updateStatus = async () => {
    updateLoading.value = true;
    try {
        const res = await axios.put('api_dashboard/orders/' + props.id, {
            status: orderStatus.value
        });
        if (res.status == 202) {
            toast.success('Update Status Successfully', { autoClose: 1000 });
            setTimeout(async () => {
                await loadOrder();
            }, 1000);
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    updateLoading.value = false;
};
</script>

<style lang="scss" scoped>
.skelton {
    height: 200px;
    background: rgba(128, 128, 128, 0.104);
    margin-bottom: 20px;
    border-radius: 30px;
}
</style>
