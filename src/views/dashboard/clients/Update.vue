<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Edit client" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="edit">
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
                                    prepend-icon="false"
                                >
                                    <template v-slot:append>
                                        <v-img v-if="state.image.length" :src="getImageUrl()" width="80" height="53"></v-img>
                                        <v-img v-else :src="apiUrl + state.path + state.storedImage" width="80" height="53"></v-img>
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
                            <v-btn flat size="large" color="primary" type="submit" :loading="state.loading"> Edit</v-btn>
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
    props: ['id'],
    setup(props) {
        const state = reactive({
            name: '',
            image: '',
            storedImage: '',
            path: '',
            status: true,
            loading: false
        });
        const apiUrl = import.meta.env.VITE_API_URL;

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            try {
                const res = await axios.get('api_dashboard/clients/' + props.id);
                if (res.status == 200) {
                    console.log(res.data.data);
                    const client = res.data.data;
                    state.path = client.ImagePath;
                    state.storedImage = client.media.name;
                    state.name = client.name;
                    state.status = Boolean(Number(client.status));
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        });

        const rules = computed(() => {
            return {
                name: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const edit = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        name: state.name,
                        image: state.image[0],
                        status: Number(state.status).toString()
                    };

                    const res = await axios.post('api_dashboard/clients/' + props.id, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.status == 202) {
                        toast.success('Client Updated Successfully');
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

        return { state, getImageUrl, v$, edit, apiUrl };
    }
};
</script>
