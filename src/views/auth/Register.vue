<template>
    <div class="register py-15">
        <v-container class="">
            <RegisterForm />
        </v-container>
    </div>
</template>

<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<style lang="scss">
.register {
    min-height: 100vh;
    background: url('@/assets/images/register.png') top center no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
