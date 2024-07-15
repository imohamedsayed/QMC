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
                            <v-col cols="12">
                                <p class="font-weight-bold">Description (English):</p>
                                <Editor
                                    api-key="b9xrw95rsgx25qrtsy8d5odilsh4zrk8xumcoonknd54j183"
                                    :init="init"
                                    initial-value="Write your blog content."
                                    v-model="state.description_en"
                                />
                                <p class="text-error" v-if="v$.description_en.$error">{{ v$.description_en.$errors[0].$message }}</p>
                            </v-col>
                            <v-col cols="12">
                                <p class="font-weight-bold">Description (Arabic):</p>

                                <Editor
                                    api-key="b9xrw95rsgx25qrtsy8d5odilsh4zrk8xumcoonknd54j183"
                                    :init="init"
                                    initial-value="اكتب محتوى المدونة بالعربي"
                                    v-model="state.description_ar"
                                />
                                <p class="text-error" v-if="v$.description_ar.$error">{{ v$.description_ar.$errors[0].$message }}</p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-file-input
                                    class="bg-white align-center"
                                    label="service image"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-image"
                                    color="primary"
                                    v-model="state.cover"
                                    prepend-icon="false"
                                >
                                    <template v-slot:append>
                                        <v-img v-if="state.cover.length" :src="getImageUrl()" width="80" height="53"></v-img>
                                        <v-img v-else :src="apiUrl + state.path + state.storedImage" width="80" height="53"></v-img>
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
import Editor from '@tinymce/tinymce-vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
export default {
    components: { UiParentCard, Editor },
    props: ['id'],
    setup(props) {
        const state = reactive({
            name_ar: '',
            name_en: '',
            description_en: '',
            description_ar: '',
            cover: '',
            path: '',
            storedImage: '',
            status: true,
            loading: false,
            services: [],
            service: ''
        });
        const apiUrl = import.meta.env.VITE_API_URL;

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

                const serviceRes = await axios.get('api_dashboard/sections/' + props.id);
                if (serviceRes.status == 200) {
                    const service = serviceRes.data.data;
                    state.name_ar = service.name_ar;
                    state.name_en = service.name_en;
                    state.description_ar = service.description_ar;
                    state.description_en = service.description_en;
                    state.status = Boolean(Number(service.status));
                    state.storedImage = service.media?.name;
                    state.path = service.ImagePath;
                } else {
                    throw new Error(serviceRes.response.data.message);
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
                service: { required }
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
                        image: state.cover[0],
                        status: Number(state.status).toString()
                    };

                    const res = await axios.post('api_dashboard/sections/' + props.id, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.status == 202) {
                        toast.success('Service Updated Successfully');
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
            if (state.cover.length) {
                return window.URL.createObjectURL(state.cover[0]);
            } else {
                return '';
            }
        };
        const init = {
            toolbar_mode: 'sliding',
            plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist',
            toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' }
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant'))
        };
        return { state, getImageUrl, v$, add, apiUrl, init };
    }
};
</script>
