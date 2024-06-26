<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new pc" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name"
                                    label="PC name"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-text"
                                    :error-messages="v$.name.$error ? v$.name.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="state.type"
                                    label="type "
                                    variant="outlined"
                                    color="primary"
                                    :items="state.types"
                                    prepend-inner-icon="mdi-devices"
                                    :error-messages="v$.type.$error ? v$.type.$errors[0].$message : ''"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="state.specifications"
                                    label="specifications"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-cpu-32-bit"
                                    :items="state.allSpecifications"
                                    item-title="name"
                                    item-value="id"
                                    multiple
                                    chips
                                    :error-messages="v$.specifications.$error ? v$.specifications.$errors[0].$message : ''"
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
    setup() {
        const state = reactive({
            name: '',
            loading: false,
            status: true,
            type: '',
            specifications: [],
            allSpecifications: [],
            types: [
                { value: 1, title: 'PC' },
                { value: 2, title: 'Workstation' }
            ]
        });

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/specifications-selection');
                if (res.status == 200) {
                    state.allSpecifications = res.data.data;
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
                type: { required },
                specifications: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    const res = await axios.post('api_dashboard/pcs', {
                        name: state.name,
                        type: state.type,
                        status: Number(state.status).toString(),
                        specifications: state.specifications
                    });

                    if (res.status == 201) {
                        toast.success('PC Added Successfully');
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
