<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new client" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name"
                                    label="Name "
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-account-group-outline"
                                    :error-messages="v$.name.$error ? v$.name.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-file-input
                                    class="bg-white align-center"
                                    label="client image"
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
            image: '',
            status: true,
            loading: false
        });

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
        });

        const rules = computed(() => {
            return {
                name: { required },
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
                        name: state.name,
                        image: state.image[0],
                        status: Number(state.status).toString()
                    };

                    const res = await axios.post('api_dashboard/clients', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.status == 201) {
                        toast.success('Client Added Successfully');
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
