<template>
    <v-progress-linear indeterminate color="skin" v-if="loading"></v-progress-linear> <br />
    <h3 class="font-weight-bold"><v-icon class="mr-2">mdi-cog</v-icon> <span class="mt-1 d-inline-block">Settings</span></h3>
    <form @submit.prevent="updateInfo">
        <v-row class="mt-16">
            <v-col cols="12" md="6">
                <v-text-field
                    label="first name"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-account"
                    v-model="firstName"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    label="last name"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-account"
                    v-model="lastName"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    label="Email"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-email"
                    v-model="email"
                ></v-text-field>
            </v-col>
        </v-row>
        <div class="mt-4">
            <v-btn color="primary" type="submit" :loading="loading"><v-icon class="mr-2">mdi-pencil</v-icon> Save changes</v-btn>
        </div>
    </form>
    <v-divider class="my-8" color="primary" thickness="2"></v-divider>
    <form @submit.prevent="changePassword">
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field
                    label="Current password"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-lock"
                    v-model="state.currentPassword"
                    :error-messages="v$.currentPassword.$error ? v$.currentPassword.$errors[0].$message : ''"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    label="New password"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-lock"
                    v-model="state.password"
                    :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    label="Confirm password"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-lock"
                    v-model="state.passwordConfirm"
                    :error-messages="v$.passwordConfirm.$error ? v$.passwordConfirm.$errors[0].$message : ''"
                ></v-text-field>
            </v-col>
        </v-row>
        <div class="mt-4">
            <v-btn color="skin" type="submit" :loading="loading"><v-icon class="mr-2">mdi-pencil</v-icon> Change password</v-btn>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs, minLength } from '@vuelidate/validators';
import axios from 'axios';

interface Data {
    current_password?: string;
    password?: string;
    password_confirmation?: string;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
}

const admin = useAuthStore().getAdmin;

const email = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');

const loading = ref<boolean>(false);

const state = reactive({
    currentPassword: '' as string,
    password: '' as string,
    passwordConfirm: '' as string
});

onMounted(() => {
    if (!admin) useRouter().push({ name: 'adminLogin' });
    email.value = admin.email;
    firstName.value = admin.firstName;
    lastName.value = admin.lastName;
});

const rules = computed(() => {
    return {
        currentPassword: { required },
        password: { required, minLength: minLength(6) },
        passwordConfirm: { required, sameAs: sameAs(state.password) }
    };
});
const v$ = useVuelidate(rules, state);

const changePassword = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        loading.value = true;
        try {
            const data: Data = {
                current_password: state.currentPassword,
                password: state.password,
                password_confirmation: state.passwordConfirm
            };

            let res: any = await axios.post('api_dashboard/change-password', data);
            if (res.status == 200) {
                toast.success('Password changed successfully');
            } else {
                throw new Error(res.response.data.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
        loading.value = false;
    } else {
        toast.error('Please provide all information correctly', {
            autoClose: 1000
        });
    }
};

const updateInfo = async () => {
    loading.value = true;
    try {
        const data: Data = {};
        if (firstName.value) data.first_name = firstName.value;
        if (lastName.value) data.last_name = lastName.value;
        if (email.value) data.email = email.value;

        await useAuthStore().updateAdmin(data);
    } catch (error: any) {
        toast.error(error.message);
    }
    loading.value = false;
};
</script>

<style></style>
