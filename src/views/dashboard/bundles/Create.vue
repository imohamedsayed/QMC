<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new bundle" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-select
                                    label="PC Model"
                                    variant="outlined"
                                    v-model="state.PCModel"
                                    :items="state.models"
                                    item-title="model_name"
                                    item-value="id"
                                    color="primary"
                                    @update:model-value="loadProducts"
                                    prepend-inner-icon="mdi-monitor"
                                    :error-messages="v$.PCModel.$error ? v$.PCModel.$errors[0].$message : ''"
                                >
                                </v-select>
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

                        <v-row v-if="showSpecifications">
                            <v-col
                                class="animate__animated animate__backInLeft d-flex gap-1"
                                cols="12"
                                md="6"
                                v-for="specification in state.specifications"
                                :key="specification.id"
                            >
                                <v-select
                                    :label="specification.name"
                                    v-model="specification.selectedProduct"
                                    variant="outlined"
                                    color="primary"
                                    :items="specification.products"
                                    item-value="id"
                                    item-title="name"
                                    class="w-75"
                                    multiple
                                    chips
                                >
                                </v-select>
                                <v-text-field
                                    type="number"
                                    label="max quantity"
                                    v-model="specification.quantity"
                                    variant="outlined"
                                    color="primary"
                                    class="w-25"
                                ></v-text-field>
                            </v-col>
                            <v-alert
                                type="error"
                                v-if="!state.specifications.length"
                                closable
                                class="animate__animated animate__fadeInDown"
                            >
                                There is not specifications selected before to the PC of this model
                            </v-alert>
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
import { reactive, computed, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/AuthStore';

import UiParentCard from '@/components/shared/UiParentCard.vue';
export default {
    components: { UiParentCard },
    setup() {
        const state = reactive({
            PCModel: '',
            products: [],
            relatedProducts: [],
            specifications: [],
            models: [],
            status: true
        });
        const showSpecifications = ref(false);

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/get-all-pc-models');
                if (res.status == 200) {
                    state.models = res.data.data;
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
                PCModel: { required }
                // products: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    const products = {};

                    state.specifications.forEach((specification) => {
                        if (specification.selectedProduct?.length > 0 && specification.quantity > 0) {
                            specification.selectedProduct.forEach((productId) => {
                                products[productId] = specification.quantity;
                            });
                        }
                    });
              

                    const res = await axios.post('api_dashboard/store-bundle', {
                        pc_model_id: state.PCModel,
                        products: products
                    });
                    if (res.status == 201) {
                        toast.success('Bundle Added Successfully');
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

        const loadProducts = async () => {
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/get-all-specification-and-products/' + state.PCModel);
                if (res.status == 200) {
                    state.specifications = res.data.data.pc.specifications;
                    showSpecifications.value = true;
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
            state.loading = false;
        };

        return { state, v$, add, loadProducts, showSpecifications };
    }
};
</script>
