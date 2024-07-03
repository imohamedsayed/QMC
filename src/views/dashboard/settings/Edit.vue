<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Edit Setting" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="edit">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.key"
                                    label="Key"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-key-outline"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="state.language"
                                    label="Key"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-flag-outline"
                                    disabled
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.value"
                                    label="Value"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-text"
                                    :error-messages="v$.value.$error ? v$.value.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-file-input
                                    class="bg-white align-center"
                                    label="Settings image"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-image"
                                    color="primary"
                                    v-model="state.image"
                                    prepend-icon="false"
                                >
                                    <template v-slot:append>
                                        <v-img v-if="state.image.length" :src="getImageUrl()" width="80" height="53"></v-img>
                                        <v-img
                                            v-else-if="state.storedImage"
                                            :src="apiUrl + state.path + state.storedImage"
                                            width="80"
                                            height="53"
                                        ></v-img>
                                    </template>
                                </v-file-input>
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
            key: '',
            image: '',
            value: '',
            storedImage: '',
            path: '',
            language: '',
            loading: false
        });
        const apiUrl = import.meta.env.VITE_API_URL;

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            try {
                const res = await axios.get('api_dashboard/settings/' + props.id);
                if (res.status == 200) {
                    console.log(res.data.data);
                    const settings = res.data.data;
                    state.path = settings.ImagePath;
                    state.value = settings.value;
                    state.language = settings.language;
                    state.storedImage = settings.media?.name || null;
                    state.key = settings.key;
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        });

        const rules = computed(() => {
            return {
                value: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const edit = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        value: state.value,
                        image: state.image[0],
                    };

                    const res = await axios.post('api_dashboard/settings/' + props.id, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.status == 202) {
                        toast.success('Settings Updated Successfully');
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
