<template>
    <form class="elevation-1 pa-8 ma-md-0" @submit.prevent="signup">
        <div v-if="!done">
            <v-progress-linear indeterminate color="skin" v-if="loading"></v-progress-linear> <br />
            <router-link to="/">
                <v-img
                    src="/images/logo.svg"
                    width="300"
                    style="height: 200px"
                    class="mx-auto mb-9 animate__animated animate__backInDown"
                ></v-img>
            </router-link>

            <v-row class="d-flex mb-3 align-center animate__animated animate__backInLeft">
                <v-col cols="12" md="6">
                    <v-text-field
                        color="skin"
                        class="bg-white"
                        hide-details
                        :label="$t('auth.fn')"
                        v-model="firstName"
                        :error-messages="v$.firstName.$error ? v$.firstName.$errors[0].$message : ''"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        class="bg-white"
                        hide-details
                        :label="$t('auth.ln')"
                        v-model="lastName"
                        :error-messages="v$.lastName.$error ? v$.lastName.$errors[0].$message : ''"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        color="skin"
                        class="bg-white"
                        hide-details
                        :label="$t('auth.email')"
                        append-inner-icon="mdi-email"
                        v-model="email"
                        :error-messages="v$.email.$error ? v$.email.$errors[0].$message : ''"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        color="skin"
                        class="bg-white"
                        hide-details
                        :label="$t('auth.phone')"
                        append-inner-icon="mdi-phone"
                        v-model="phone"
                        :error-messages="v$.phone.$error ? v$.phone.$errors[0].$message : ''"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        color="skin"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                        :label="$t('auth.password')"
                        class="bg-white"
                        hide-details
                        v-model="password"
                        @click:append-inner="visible = !visible"
                        :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        color="skin"
                        :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible2 ? 'text' : 'password'"
                        :label="$t('auth.confirm')"
                        class="bg-white"
                        hide-details
                        v-model="passwordConfirmation"
                        @click:append-inner="visible2 = !visible2"
                        :error-messages="v$.passwordConfirmation.$error ? v$.passwordConfirmation.$errors[0].$message : ''"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-radio-group color="white " inline v-model="gender">
                        <v-radio :label="$t('auth.male')" :value="1"></v-radio>
                        <v-radio :label="$t('auth.female')" :value="0" class="ml-4"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col class="12" md="6">
                    <v-checkbox :label="$t('auth.terms')" color="skin" v-model="checkbox"></v-checkbox>
                </v-col>
            </v-row>

            <div class="text-center mt-10 animate__animated animate__backInUp">
                <v-btn color="skin" class="w-auto" size="x-large" :loading="loading" type="submit"> {{ $t('auth.create') }}</v-btn>
                <p class="mt-5" style="text-align: center">
                    {{ $t('auth.already') }}
                    <router-link to="/login" class="text-skin font-weight-medium" style="text-decoration: none">{{
                        $t('auth.login')
                    }}</router-link>
                </p>
            </div>
        </div>
        <div v-else class="animate__animated animate__bounceInDown text-center">
            <v-icon size="200" color="skin" class="animate__animated animate__backInLeft">mdi-check-circle-outline</v-icon>
            <p class="mt-4 text-center font-weight-bold text-skin animate__animated animate__backInUp" style="font-size: 1.7rem">
                {{ $t('auth.email_sent') }}
            </p>
        </div>
    </form>
</template>
<script setup>
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, email as c, minLength } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

import { ref } from 'vue';
const checkbox = ref(false);
const visible = ref(false);
const visible2 = ref(false);
const done = ref(false);
// store & router
const authStore = useAuthStore();
const router = useRouter();

// inputs
const firstName = ref('');
const lastName = ref('');
const phone = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const gender = ref(3);

// vars
const loading = ref(false);

const rules = {
    firstName: { required },
    lastName: { required },
    phone: { required },
    gender: { required },
    email: { required, c },
    password: { required, minLength: minLength(6) },
    passwordConfirmation: { required, minLength: minLength(6) }
};
const v$ = useVuelidate(rules, { firstName, lastName, phone, gender, email, password, passwordConfirmation });

const signup = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        loading.value = true;
        try {
            const data = {
                first_name: firstName.value,
                last_name: lastName.value,
                phone_number: phone.value,
                email: email.value,
                gender: gender.value,
                password: password.value,
                password_confirmation: passwordConfirmation.value
            };

            await authStore.Register(data);
            done.value = true;
        } catch (err) {
            toast.error(err.message, {
                autoClose: 1000
            });
        }
        loading.value = false;
    } else {
        toast.error(t('auth.error'), {
            autoClose: 1000
        });
    }
};
</script>
<style scoped>
form {
    background: rgba(217, 217, 217, 0.8);
    backdrop-filter: blur(4px);
    border: 2px solid #4e62d4;
    border-radius: 25px;
}
.text-center {
    text-align: center !important;
}
</style>
