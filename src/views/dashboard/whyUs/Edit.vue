<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Edit why-us box" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="edit">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name_en"
                                    label="Title (English)"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-card-bulleted-outline"
                                    :error-messages="v$.name_en.$error ? v$.name_en.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.name_ar"
                                    label="Title (Arabic)"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-card-bulleted-outline"
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
                                <v-text-field
                                    v-model="state.icon"
                                    label="Icon"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-emoticon-excited-outline"
                                    :error-messages="v$.name_ar.$error ? v$.name_ar.$errors[0].$message : ''"
                                >
                                    <template v-slot:append>
                                        <v-icon v-if="state.icon" class="text-green">{{ 'mdi-' + state.icon }}</v-icon>
                                    </template>
                                </v-text-field>
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
            name_ar: '',
            name_en: '',
            description_en: '',
            description_ar: '',
            icon: '',
            status: true,
            loading: false
        });

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/whyus/' + props.id);
                if (res.status == 200) {
                    const whyUs = res.data.data;
                    state.icon = whyUs.icon;
                    state.name_ar = whyUs.name_ar;
                    state.name_en = whyUs.name_en;
                    state.description_ar = whyUs.description_ar;
                    state.description_en = whyUs.description_en;
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
                icon: { required }
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
                        icon: state.icon,
                        status: Number(state.status).toString()
                    };

                    const res = await axios.post('api_dashboard/whyus/' + props.id, data);

                    if (res.status == 202) {
                        toast.success('Why-us Box Updated Successfully');
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

        return { state, v$, edit };
    }
};
</script>
