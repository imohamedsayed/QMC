<template>
    <v-progress-linear indeterminate color="skin" v-if="loading"></v-progress-linear> <br />
    <h3 class="font-weight-bold">
        <v-icon class="mr-2">mdi-truck-outline</v-icon> <span class="mt-1 d-inline-block">Orders Settings</span>
    </h3>
    <form @submit.prevent="updateDelivery">
        <v-row class="mt-16">
            <v-col cols="12" md="6">
                <label class="mb-6 d-block font-weight-bold">Delivery Cost inside Cairo</label>
                <v-text-field
                    label="Delivery Cost"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-cash-multiple"
                    v-model="delivery"
                    required
                ></v-text-field>
            </v-col>
        </v-row>
        <div class="mt-4">
            <v-btn color="primary" type="submit" :loading="loading"><v-icon class="mr-2">mdi-pencil</v-icon> Update Delivery Cost</v-btn>
        </div>
    </form>
    <v-divider class="my-8" color="primary" thickness="2"></v-divider>
    <form @submit.prevent="updateDays">
        <v-row>
            <v-col cols="12" md="6">
                <label class="mb-6 d-block font-weight-bold">Max number of Days if the user will receive his order from the shop</label>

                <v-text-field
                    label="days"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-calendar-today"
                    v-model="days"
                    required
                ></v-text-field>
            </v-col>
        </v-row>
        <div class="mt-4">
            <v-btn color="skin" type="submit" :loading="loading"><v-icon class="mr-2">mdi-pencil</v-icon> Update Max number of Days</v-btn>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from 'axios';

const admin = computed(() => useAuthStore().getAdmin);

const loading = ref<boolean>(false);
const delivery = ref('');
const days = ref('');
onMounted(async () => {
    if (!admin.value) useRouter().push({ name: 'adminLogin' });
    else {
        try {
            const res: any = await axios.get('api/settings');
            if (res.status == 200) {
                delivery.value = res.data.setting[0].value;
                days.value = res.data.setting[1].value;
            } else {
                throw new Error(res.response.data.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }
});

const updateDelivery = async () => {
    loading.value = true;
    try {
        const res: any = await axios.put('api_dashboard/orders-shipping', {
            shipping: delivery.value
        });
        if (res.status == 202) {
            toast.success('Updated Delivery cost inside cairo successfully');
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error: any) {
        toast.error(error.message);
    }
    loading.value = false;
};

const updateDays = async () => {
    loading.value = true;
    try {
        const res: any = await axios.put('api_dashboard/orders-receive-in-days', {
            order_recevice_after_days: days.value
        });
        if (res.status == 202) {
            toast.success('Updated max number of days to receive the order successfully');
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error: any) {
        toast.error(error.message);
    }
    loading.value = false;
};
</script>

<style></style>
