<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="PC Models">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddPCModel' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new PC model</v-btn
                    >
                </div>
                <PCModelsList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import PCModelsList from '@/components/admin/pc model/PCModelsList.vue';
export default {
    components: { UiParentCard, PCModelsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
