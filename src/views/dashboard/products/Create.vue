<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new product" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name"
                                    label="Product name"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-text"
                                    :error-messages="v$.name.$error ? v$.name.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.description"
                                    label="Description"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-text"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.price"
                                    type="Number"
                                    label="Price"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-cash-multiple"
                                    :error-messages="v$.price.$error ? v$.price.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.quantity"
                                    label="Quantity"
                                    type="Number"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-counter"
                                    :error-messages="v$.quantity.$error ? v$.quantity.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    label="Price Category"
                                    variant="outlined"
                                    v-model="state.priceCategory"
                                    :items="state.prices"
                                    color="primary"
                                    prepend-inner-icon="mdi-cash"
                                    :error-messages="v$.priceCategory.$error ? v$.priceCategory.$errors[0].$message : ''"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    label="Specification"
                                    variant="outlined"
                                    v-model="state.specification"
                                    :items="state.specifications"
                                    item-title="name"
                                    item-value="id"
                                    color="primary"
                                    prepend-inner-icon="mdi-cpu-32-bit"
                                    :error-messages="v$.specification.$error ? v$.specification.$errors[0].$message : ''"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    label="Main Category"
                                    variant="outlined"
                                    v-model="state.parentId"
                                    :items="state.parentCategories"
                                    item-title="name"
                                    item-value="id"
                                    color="primary"
                                    prepend-inner-icon="mdi-crop-square"
                                    @update:model-value="loadCategories"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6" v-if="state.parentId" class="animate__animated animate__backInLeft">
                                <v-select
                                    label="Category"
                                    variant="outlined"
                                    v-model="state.category"
                                    :items="state.categories"
                                    item-title="name"
                                    item-value="id"
                                    color="primary"
                                    prepend-inner-icon="mdi-crop-square"
                                    :error-messages="v$.category.$error ? v$.category.$errors[0].$message : ''"
                                >
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-file-input
                                    class="bg-white align-center"
                                    label="Model Images"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-image"
                                    color="primary"
                                    multiple
                                    v-model="state.images"
                                    :error-messages="v$.images.$error ? v$.images.$errors[0].$message : ''"
                                >
                                </v-file-input>
                                <v-row class="mt-4">
                                    <v-col cols="4" v-for="img in state.images" :key="img">
                                        <v-img :src="getImageUrl(img)"></v-img>
                                    </v-col>
                                </v-row>
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
import { required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/AuthStore';

import UiParentCard from '@/components/shared/UiParentCard.vue';
export default {
    components: { UiParentCard },
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL
        };
    },
    setup() {
        const state = reactive({
            name: '',
            description: '',
            images: [],
            status: false,
            loading: false,
            price: '',
            quantity: '',
            specification: '',
            specifications: [],
            category: '',
            categories: [],
            priceCategory: '',
            parentId: '',
            parentCategories: [],
            prices: [
                { title: 'Low', value: 'low' },
                { title: 'Medium', value: 'medium' },
                { title: 'High', value: 'high' }
            ]
        });
        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/specifications-selection');
                if (res.status == 200) {
                    state.specifications = res.data.data;
                } else {
                    throw new Error(res.response.data.message);
                }

                const catsRes = await axios.get('api_dashboard/parentCategories');
                if (catsRes.status == 200) {
                    state.parentCategories = catsRes.data.data;
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
                name: { required },
                images: { required },
                price: { required },
                quantity: { required },
                specification: { required },
                priceCategory: { required },
                category: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        name: state.name,
                        description: state.description,
                        price: state.price,
                        quantity: state.quantity,
                        specification_id: state.specification,
                        category_id: state.category,
                        price_category: state.priceCategory,
                        images: state.images,
                        status: Number(state.status).toString()
                    };

                    const res = await axios.post('api_dashboard/products', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.status == 201) {
                        toast.success('Product Added Successfully');
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

        const getImageUrl = (img) => {
            return window.URL.createObjectURL(img);
        };
        const loadCategories = async () => {
            try {
                const res = await axios.get('api_dashboard/get-sub-categories/' + state.parentId);
                if (res.status == 200) {
                    state.categories = res.data.data;
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        return { state, getImageUrl, v$, add, loadCategories };
    }
};
</script>
