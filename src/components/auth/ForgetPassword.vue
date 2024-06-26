<template>
    <form @submit.prevent="sendVerificationEmail">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Email</v-label>
                <v-text-field
                    variant="outlined"
                    color="primary"
                    v-model="state.email"
                    prepend-inner-icon="mdi-email"
                    :error-messages="v$.email.$error ? v$.email.$errors[0].$message : ''"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0 mt-10">
                <v-btn type="submit" color="primary" size="large" block flat :loading="state.loading">Send Email</v-btn>
            </v-col>
        </v-row>
    </form>
</template>
<script>
import { reactive, computed } from 'vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios from 'axios';
export default {
    setup() {
        const state = reactive({
            email: '',
            loading: false
        });
        const rules = computed(() => {
            return {
                email: { required, email }
            };
        });
        const v$ = useVuelidate(rules, state);

        const sendVerificationEmail = async () => {
            v$.value.$validate();
            if (!v$.value.$error) {
                state.loading = true;
                try {
                    const res = await axios.post('api_dashboard/forget-password', {
                        email: state.email,
                        isAdmin: 1
                    });
                    if (res.status == 200) {
                        toast.success('Mail was sent, please Check Your Inbox');
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
                toast.error('Please write a correct email', {
                    autoClose: 1000
                });
            }
        };

        return { state, sendVerificationEmail, v$ };
    }
};
</script>
