<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Edit blog" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="edit">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name_en"
                                    label="Name (English)"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-post-outline"
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
                                    prepend-inner-icon="mdi-post-outline"
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
                                    label="blog Image"
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
import Editor from '@tinymce/tinymce-vue';
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
            status: false,
            loading: true,
            storedImage: ''
        });
        const apiUrl = import.meta.env.VITE_API_URL;
        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/blogs/' + props.id);
                if (res.status == 200) {
                    const blog = res.data.data;
                    state.name_ar = blog.name_ar;
                    state.name_en = blog.name_en;
                    state.description_ar = blog.description_ar;
                    state.description_en = blog.description_en;
                    state.path = blog.ImagePath;

                    state.storedImage = blog.media?.name || null;

                    state.status = Boolean(Number(blog.status));
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
                description_ar: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const edit = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        name_en: state.name_en,
                        name_ar: state.name_ar,
                        description_en: state.description_en,
                        description_ar: state.description_ar,
                        image: state.cover[0],
                        status: Number(state.status).toString()
                    };

                    const res = await axios.post('api_dashboard/blogs/' + props.id, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (res.status == 202) {
                        toast.success('Blog updated successfully');
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
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
            toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: useAuthStore().getAdmin.name,
            mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' }
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant'))
        };
        return { state, getImageUrl, v$, edit, apiUrl, init };
    }
};
</script>
