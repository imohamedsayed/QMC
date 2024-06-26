<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="edit category" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="edit">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name"
                                    label="category name"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-text"
                                    :error-messages="v$.name.$error ? v$.name.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-file-input
                                    class="bg-white align-center"
                                    label="Category Cover"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-image"
                                    color="primary"
                                    v-model="state.cover"
                                    prepend-icon="false"
                                >
                                    <template v-slot:append>
                                        <v-img v-if="state.cover.length" :src="getImageUrl()" width="80" height="53"></v-img>
                                        <v-img v-else :src="apiUrl + state.storedImage" width="80" height="53"></v-img>
                                    </template>
                                </v-file-input>
                            </v-col>
                            <v-col>
                                <v-select
                                    label="parent category (optional)"
                                    variant="outlined"
                                    v-model="state.parentId"
                                    :items="state.parentCategories"
                                    item-title="name"
                                    item-value="id"
                                    color="primary"
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
import UiParentCard from '@/components/shared/UiParentCard.vue';
export default {
    components: { UiParentCard },
    props: ['id'],
    setup(props) {
        const state = reactive({
            name: '',
            cover: '',
            status: false,
            parentId: null,
            loading: false,
            storedImage: '',
            parentCategories: []
        });
        const apiUrl = import.meta.env.VITE_API_URL;
        onMounted(async () => {
            if (!useAuthStore().getAdmin || useAuthStore().getAdmin.role_id == 3) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/category/' + props.id);
                if (res.status == 200) {
                    const category = res.data.data;
                    state.name = category.name;
                    state.storedImage = category.cover;
                    state.parentId = category.parentId;
                    state.status = category.status == 'Enable';
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
            try {
                const pres = await axios.get('api_dashboard/parentCategories');
                if (pres.status == 200) {
                    state.parentCategories = pres.data.data;
                } else {
                    throw new Error(pres.response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }

            state.loading = false;
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
                        cover: state.cover[0],
                        status: Number(state.status).toString(),
                        parent_id: state.parentId
                    };

                    const res = await axios.post('api_dashboard/categories/' + props.id, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (res.status == 202) {
                        toast.success('Category updated successfully');
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

        return { state, getImageUrl, v$, edit, apiUrl };
    }
};
</script>
