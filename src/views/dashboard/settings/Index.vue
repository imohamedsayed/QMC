<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Settings">
                <SettingsList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import SettingsList from '@/components/admin/settings/SettingsList.vue';
export default {
    components: { UiParentCard, SettingsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
