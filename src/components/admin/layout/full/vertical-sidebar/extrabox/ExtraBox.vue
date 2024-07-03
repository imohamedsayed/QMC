<template>
    <v-sheet rounded="lg" color="lightprimary" class="ExtraBox hide-menu pa-4" v-if="admin">
        <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
                <div class="me-2">
                    <v-avatar image="/assets/images/users/3.jpg" size="40"></v-avatar>
                </div>

                <div class="pr-1">
                    <h6 class="text-h6 mb-0">{{ admin.name || 'Admin' }}</h6>

                    <span class="font-12-regular">{{ admin.role_name }}</span>
                </div>
            </div>

            <v-btn size="x-small" icon="mdi-logout" elevation="0" @click="logout"></v-btn>
        </div>
    </v-sheet>
</template>
<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
const admin = useAuthStore().getAdmin;
const router = useRouter();
const logout = async () => {
    try {
        await useAuthStore().logout();

        router.push({ name: 'adminLogin' });
    } catch (error) {
        toast.error(error.message);
    }
};
</script>
<style lang="scss">
.ExtraBox {
    position: relative;
}
.line-height-none {
    line-height: normal;
}
</style>
