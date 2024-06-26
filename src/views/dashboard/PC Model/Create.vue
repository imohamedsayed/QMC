<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new PC Model" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name"
                                    label="PC model name"
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
                                <v-text-field
                                    v-model="state.os"
                                    label="Operating System"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-microsoft-windows"
                                    :error-messages="v$.os.$error ? v$.os.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.color"
                                    label="Color"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-palette"
                                    :error-messages="v$.color.$error ? v$.color.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.weight"
                                    label="Weight"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-weight"
                                    :error-messages="v$.weight.$error ? v$.weight.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    label="Uses For"
                                    variant="outlined"
                                    v-model="state.usesFor"
                                    :items="[
                                        { value: 'Business', title: 'Business' },
                                        { value: 'Gaming', title: 'Gaming' }
                                    ]"
                                    color="primary"
                                    prepend-inner-icon="mdi-youtube-gaming"
                                    :error-messages="v$.usesFor.$error ? v$.usesFor.$errors[0].$message : ''"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    label="Brand"
                                    variant="outlined"
                                    v-model="state.brand"
                                    :items="state.brands"
                                    item-title="name"
                                    item-value="id"
                                    color="primary"
                                    prepend-inner-icon="mdi-alpha-b-circle-outline"
                                    :error-messages="v$.brand.$error ? v$.brand.$errors[0].$message : ''"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    label="PC"
                                    variant="outlined"
                                    v-model="state.pc"
                                    :items="state.pcs"
                                    item-title="name"
                                    item-value="id"
                                    color="primary"
                                    prepend-inner-icon="mdi-monitor"
                                    :error-messages="v$.pc.$error ? v$.pc.$errors[0].$message : ''"
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
            images: [],
            status: false,
            loading: false,
            description: '',
            price: '',
            quantity: '',
            os: '',
            weight: '',
            usesFor: '',
            color: '',
            brand: '',
            pc: '',
            brands: [],
            pcs: [],
            parentCategories: []
        });
        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/barnds-selection');
                if (res.status == 200) {
                    state.brands = res.data.data;
                } else {
                    throw new Error(res.response.data.message);
                }

                const pcsRes = await axios.get('api_dashboard/pcs-selection');
                if (pcsRes.status == 200) {
                    state.pcs = pcsRes.data.data;
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
                os: { required },
                color: { required },
                weight: { required },
                usesFor: { required },
                brand: { required },
                pc: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        model_name: state.name,
                        description: state.description,
                        price: state.price,
                        quantity: state.quantity,
                        OS: state.os,
                        color: state.color,
                        weight: state.weight,
                        uses_for: state.usesFor,
                        brand_id: state.brand,
                        pc_id: state.pc,
                        images: state.images,
                        status: Number(state.status).toString()
                    };

                    const res = await axios.post('api_dashboard/pc-models', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.status == 201) {
                        toast.success('PC Model Added Successfully');
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

        return { state, getImageUrl, v$, add };
    }
};
</script>
