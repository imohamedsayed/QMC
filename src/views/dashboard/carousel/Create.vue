<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a carousel images" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="12">
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
                                    <v-col cols="2" v-for="img in state.images" :key="img">
                                        <v-img width="100" height="200" :src="getImageUrl(img)"></v-img>
                                    </v-col>
                                </v-row>
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
            images: [],
            loading: false
        });

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
        });

        const rules = computed(() => {
            return {
                images: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    const data = {
                        images: state.images
                    };
                    const res = await axios.post('api_dashboard/settings/change-image', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (res.status == 202) {
                        toast.success("Carousel's images Added Successfully");
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
        return { state, v$, add, getImageUrl };
    }
};
</script>
