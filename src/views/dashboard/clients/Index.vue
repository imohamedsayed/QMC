<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Clients">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddClient' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new Client</v-btn
                    >
                </div>
                <ClientsList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import ClientsList from '@/components/admin/clients/ClientsList.vue';
export default {
    components: { UiParentCard, ClientsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
