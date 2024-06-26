<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new pc" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="state.product"
                                    label="Product"
                                    variant="outlined"
                                    color="primary"
                                    :items="state.products"
                                    item-value="id"
                                    item-title="name"
                                    prepend-inner-icon="mdi-devices"
                                    :error-messages="v$.product.$error ? v$.product.$errors[0].$message : ''"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.discount"
                                    label="Discount "
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-sale"
                                    :error-messages="v$.discount.$error ? v$.discount.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    type="date"
                                    v-model="state.expirationDate"
                                    label="Discount "
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-sale"
                                >
                                </v-text-field>
                                <v-alert closable type="info"
                                    >If no expiration date is specified, the sale remains until the quantity expires</v-alert
                                >
                            </v-col>
                            <v-col cols="12" md="6" class="pl-13">
                                <p class="text-weight-bold">status:</p>
                                <v-switch
                                    :label="state.status ? 'active' : 'not active'"
                                    true-icon="mdi-check"
                                    color="success"
                                    v-model="state.status"
                                ></v-switch>
                            </v-col>
                        </v-row>
                        <div class="text-center mt-10">
                            <v-btn flat size="large" color="primary" type="submit" :loading="state.loading"> Add</v-btn>
                        </div>
                    </form>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/AuthStore';

import UiParentCard from '@/components/shared/UiParentCard.vue';
export default {
    components: { UiParentCard },
    setup() {
        const state = reactive({
            loading: false,
            status: true,
            product: '',
            discount: '',
            expirationDate: '',
            products: []
        });

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/get-all-products-selection');
                if (res.status == 200) {
                    state.products = res.data.data;
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
            state.loading = false;
        });

        const rules = computed(() => {
            return {
                product: { required },
                discount: { required, numeric }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        product_id: state.product,
                        discount: state.discount,
                        status: Number(state.status).toString()
                    };
                    if (state.expirationDate) {
                        data.expire_date = state.expirationDate;
                    }

                    const res = await axios.post('api_dashboard/sales', data);
                    if (res.status == 201) {
                        toast.success('Sale Added Successfully');
                    } else {
                        throw new Error(res.response.data.message);
                    }
                } catch (err) {
                    toast.error(err.message, {
                        autoClose: 1000
                    });
                }

                state.loading = false;
            } else {
                toast.error('Please provide all information correctly', {
                    autoClose: 1000
                });
            }
        };

        return { state, v$, add };
    }
};
</script>
