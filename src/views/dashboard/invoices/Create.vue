<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new invoice" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-file-input
                                    v-model="state.invoice"
                                    label="Invoice"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-file-upload-outline"
                                    :error-messages="v$.invoice.$error ? v$.invoice.$errors[0].$message : ''"
                                >
                                </v-file-input>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="state.user"
                                    label="user "
                                    variant="outlined"
                                    color="primary"
                                    :items="state.users"
                                    prepend-inner-icon="mdi-account-outline"
                                    :error-messages="v$.user.$error ? v$.user.$errors[0].$message : ''"
                                    item-value="id"
                                    item-title="email"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                        <div class="text-center mt-10">
                            <v-btn flat size="large" color="primary" type="submit" :loading="state.loading"> Send</v-btn>
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
            invoice: '',
            loading: false,
            user: '',
            users: []
        });

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/user-selection');
                if (res.status == 200) {
                    state.users = res.data.data;
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
                invoice: { required },
                user: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                const data = {
                    user_id: state.user,
                    file: state.invoice[0]
                };
                try {
                    const res = await axios.post('api_dashboard/attachments', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (res.status == 201) {
                        toast.success('Invoice Sent Successfully');
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
