<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Employees">
                <div v-if="authorized">
                    <div class="text-end mr-10">
                        <v-btn color="primary" @click="$router.push({ name: 'AddAdmin' })"
                            ><v-icon class="mr-2">mdi-plus</v-icon> Add new employee</v-btn
                        >
                    </div>
                    <AdminsList />
                </div>
                <div class="py-16 text-center" v-else>
                    <v-icon size="200" color="error" style="text-align: center">mdi-alert-outline</v-icon>
                    <p class="font-weight-bold text-error" style="font-size: 1.2rem; text-align: center">
                        This page is available for the super admin only
                    </p>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import AdminsList from '@/components/admin/admins/AdminsList.vue';
export default {
    components: { UiParentCard, AdminsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        const authorized = ref(false);
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });

            if (admin.role_id == 1) authorized.value = true;
        });
        return { authorized };
    }
};
</script>
