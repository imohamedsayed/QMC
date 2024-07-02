<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new service" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name_en"
                                    label="Name (English)"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-briefcase-outline"
                                    :error-messages="v$.name_en.$error ? v$.name_en.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name_ar"
                                    label="Name (Arabic)"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-briefcase-outline"
                                    :error-messages="v$.name_ar.$error ? v$.name_ar.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-textarea
                                    v-model="state.description_en"
                                    label="Description (English)"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-text"
                                    :error-messages="v$.description_en.$error ? v$.description_en.$errors[0].$message : ''"
                                >
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-textarea
                                    v-model="state.description_ar"
                                    label="Description (Arabic)"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-text"
                                    :error-messages="v$.description_ar.$error ? v$.description_ar.$errors[0].$message : ''"
                                >
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-file-input
                                    class="bg-white align-center"
                                    label="service image"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-image"
                                    color="primary"
                                    v-model="state.image"
                                    :error-messages="v$.image.$error ? v$.image.$errors[0].$message : ''"
                                    prepend-icon="false"
                                >
                                    <template v-slot:append>
                                        <v-img v-if="state.image.length" :src="getImageUrl()" width="80" height="53"></v-img>
                                    </template>
                                </v-file-input>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="state.service"
                                    label="Service Section"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-briefcase"
                                    :items="state.services"
                                    item-title="name_en"
                                    item-value="id"
                                    :error-messages="v$.service.$error ? v$.service.$errors[0].$message : ''"
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
            name_ar: '',
            name_en: '',
            description_en: '',
            description_ar: '',
            image: '',
            status: true,
            loading: false,
            services: [],
            service: ''
        });

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/services/service-selection');
                if (res.status == 200) {
                    state.services = res.data.data;
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
                name_en: { required },
                name_ar: { required },
                description_en: { required },
                description_ar: { required },
                service: { required },
                image: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        name_en: state.name_en,
                        name_ar: state.name_ar,
                        description_en: state.description_en,
                        description_ar: state.description_ar,
                        service_id: state.service,
                        image: state.image[0],
                        status: Number(state.status).toString()
                    };

                    const res = await axios.post('api_dashboard/sections', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.status == 201) {
                        toast.success('Service Added Successfully');
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

        const getImageUrl = () => {
            if (state.image.length) {
                return window.URL.createObjectURL(state.image[0]);
            } else {
                return '';
            }
        };

        return { state, getImageUrl, v$, add };
    }
};
</script>
