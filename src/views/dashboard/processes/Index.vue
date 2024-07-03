<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Our Process">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddProcess' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new process</v-btn
                    >
                </div>
                <ProcessesList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import ProcessesList from '@/components/admin/processes/ProcessesList.vue';
export default {
    components: { UiParentCard, ProcessesList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
