<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Add a new employee" :loading="state.loading">
                <div class="pa-10">
                    <form @submit.prevent="add" v-if="state.authorized">
                        <v-row class="align-center">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.first_name"
                                    label="First name"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-account-outline"
                                    :error-messages="v$.first_name.$error ? v$.first_name.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.last_name"
                                    label="Last name"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-account-outline"
                                    :error-messages="v$.last_name.$error ? v$.last_name.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.email"
                                    label="Email"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-email-outline"
                                    :error-messages="v$.email.$error ? v$.email.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-lock-outline"
                                    :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="state.password_confirmation"
                                    label="Confirm password"
                                    variant="outlined"
                                    color="primary"
                                    prepend-inner-icon="mdi-lock-outline"
                                    :error-messages="v$.password_confirmation.$error ? v$.password_confirmation.$errors[0].$message : ''"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col>
                                <v-select
                                    label="Role"
                                    variant="outlined"
                                    v-model="state.role"
                                    :items="state.roles"
                                    item-title="title"
                                    color="primary"
                                    prepend-inner-icon="mdi-security"
                                    item-value="value"
                                    :error-messages="v$.role.$error ? v$.role.$errors[0].$message : ''"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                        <div class="text-center mt-10">
                            <v-btn flat size="large" color="primary" type="submit" :loading="state.loading"> Add</v-btn>
                        </div>
                    </form>
                    <div class="py-16 text-center" v-else>
                        <v-icon size="200" color="error" style="text-align: center">mdi-alert-outline</v-icon>
                        <p class="font-weight-bold text-error" style="font-size: 1.2rem; text-align: center">
                            This page is available for the super admin only
                        </p>
                    </div>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/AuthStore';

import UiParentCard from '@/components/shared/UiParentCard.vue';
export default {
    components: { UiParentCard },
    setup() {
        const state = reactive({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: '',
            roles: [
                {
                    title: 'Admin',
                    value: 'admin'
                },
                {
                    title: 'Supervisor',
                    value: 'supervisor'
                }
            ],
            status: false,
            loading: false,
            authorized: false
        });

        onMounted(async () => {
            if (!useAuthStore().getAdmin) useRouter().push({ name: 'adminLogin' });
            if (useAuthStore().getAdmin.role_id == 1) {
                state.authorized = true;
            }
        });

        const rules = computed(() => {
            return {
                first_name: { required },
                last_name: { required },
                email: { required },
                password: { required },
                password_confirmation: { required, sameAs: sameAs(state.password) },
                role: { required }
            };
        });
        const v$ = useVuelidate(rules, state);

        const add = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    let data = {
                        first_name: state.first_name,
                        last_name: state.last_name,
                        email: state.email,
                        password: state.password,
                        password_confirmation: state.password_confirmation,
                        role: state.role
                    };

                    const res = await axios.post('api_dashboard/managers', data);

                    if (res.status == 201) {
                        toast.success('Employee Added Successfully');
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
